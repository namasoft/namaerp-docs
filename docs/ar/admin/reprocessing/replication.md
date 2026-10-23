# أدوات النسخ المتطابق (Replication Utilities)

جمل SQL تنظّف جداول رسائل النسخ المتطابق (Replication) من الرسائل المرسلة ورسائل المواقع غير النشطة، وخطوات أخذ نسخة احتياطية من المركز الرئيسي واستعادتها في الفرع.

## تنظيف النسخ المتطابق (Replication Clean Up)
::: details
```sql
update m set messageSent = 1 from SiteOutMessage m left join ReplicationSite rs on rs.code = m.siteCode where rs.inActive = 1 and m.messageSent = 0

    WHILE exists (select top 1 id from SiteOutMessage where messageSent = 1)
BEGIN
BEGIN TRANSACTION x;
delete top (10000) from SiteOutMessage where messageSent = 1;
Commit transaction x;
END;
go
WHILE exists (select top 1 toDel.id from OutBusMessage toDel left join SiteOutMessage som on som.messageId = toDel.id where som.id is null and toDel.messageSent = 1 and toDel.sequence < (select max(sequence) from OutBusMessage ))
BEGIN
BEGIN TRANSACTION x;
delete top (1000) toDel from OutBusMessage toDel left join SiteOutMessage som on som.messageId = toDel.id where som.id is null and toDel.messageSent = 1 and toDel.sequence < (select max(sequence) from OutBusMessage );
Commit transaction x;
END;
go
WHILE exists (select top 1 id from InBusMessage where status = 'Executed')
BEGIN
BEGIN TRANSACTION x;
delete top (10000) from InBusMessage where status = 'Executed'
Commit transaction x;

END;
go

```
:::

## خطوات أخذ نسخة احتياطية واستعادتها في الفرع (Take Backup and Restore It in Branch Steps)
- تجهيز النسخة الاحتياطية ونسخها إلى الفرع
- إيقاف Tomcat في الفرع
- استعادة النسخة الاحتياطية في الفرع
- إيقاف Tomcat في المركز الرئيسي
- نفّذ ما يلي في المركز الرئيسي:
::: details
```sql
update ReplicationStatistics set lastSentMessage = 1, waitingReadCount = 0 , remoteFailuresCount = 0 , localFailuresCount = 0,
lastReceivedMessage = 0 
where siteCode = 'branchcode'
```
:::
- نفّذ ما يلي في الفرع:
::: details
```sql
delete from SiteOutMessage
delete from OutBusMessage
delete from InBusMessage

update ReplicationStatistics set lastSentMessage = 1, waitingReadCount = 0 , remoteFailuresCount = 0 , localFailuresCount = 0,
lastReceivedMessage = 0 
where siteCode = 'headoffice'
```
:::
- ابدأ تشغيل Tomcat في المركز الرئيسي وفي الفرع
- أعد حفظ أي شيء في الفرع وتأكد من استلام الرسالة في المركز الرئيسي
- أعد حفظ أي شيء في المركز الرئيسي وتأكد من استلام الرسالة في الفرع
