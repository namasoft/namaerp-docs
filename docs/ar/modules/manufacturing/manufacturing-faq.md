---
entities: [ProductionOrder]
---

<rtl>

# أسئلة شائعة حول موديول التصنيع في نظام نما

## أريد عند حفظ أمر الإنتاج أن تتغير حالته مباشرة إلى "قيد التنفيذ" بحيث أتمكن من تنفيذ أمر الإنتاج بعد الحفظ مباشرة

يمكنك تحقيق ذلك من خلال **مسار كيان (Entity Flow)** يُنفذ أثناء عملية حفظ أمر الإنتاج.

### الإجراء المستخدم

`ما قبل تحديث الحقول المحسوبة` (`PreUpdateCalculatedFields`)

### العنصر الجاهز

`EAStartOrderIfNotStarted`
هذا العنصر يقوم بفحص حالة أمر الإنتاج، وإذا لم تكن الحالة قد بدأت، فإنه يغيرها إلى "قيد التنفيذ".

### طريقة التفعيل

قم بإضافة مسار كيان من النوع `ProductionOrder`، وضع به العنصر المذكور على الإجراء `PreUpdateCalculatedFields`.

::: details JSON للاستيراد المباشر

```json
{
  "targetType": "ProductionOrder",
  "details": [
    {
      "className": "com.namasoft.modules.manufacturing.domain.utils.plugnplay.EAStartOrderIfNotStarted",
      "targetAction": "PreUpdateCalculatedFields"
    }
  ]
}
```
:::


</rtl>
