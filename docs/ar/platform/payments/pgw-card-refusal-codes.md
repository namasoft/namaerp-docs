# برنامج PGW: رموز رفض البطاقات

حين تفشل دفعة بطاقة عبر PGW يحتاج الكاشير إلى معرفة شيء واحد بسرعة: هل يمكن للعميل أن يعيد المحاولة بهذه البطاقة، أم أنها لن تمر أبدًا؟ يرد جهاز البطاقات على كل دفعة مرفوضة برمز استجابة. وتسرد هذه الصفحة الرموز ومعانيها، ليحوّل الكاشير أو موظف الدعم الرقم الظاهر أمامه إلى قرار.

أما طريق الدفعة والمواضع التي قد تفشل فيها فمشروحة في [رحلة الدفع بالبطاقة عبر PGW](/ar/platform/payments/pgw-card-payment-flow).

## أين تجد الرمز

- **أجهزة Geidea.** يعرض نما الرمز ومعناه في رسالة الرفض نفسها، مثل *Purchase Transaction refused - 116 - Not Enough Balance*.
- **أجهزة Neoleap.** تحمل رسالة الرفض في نما المعنى المذكور في جدول رموز Neoleap أدناه، مثل *PIN timeout.*، لكن بلا الرمز نفسه. ولترى الرمز افتح نافذة **Last Transactions** في PGW، فرد الجهاز (السطر الذي يبدأ بـ *Here is the body of neoleap response*) فيه الرمز في `TerminalStatusCode` ونتيجة مختصرة بالإنجليزية مثل `DECLINED`.
- **InterPay.** يعيد softPOS السبب نصًّا، وتجده في الحقل `message` من الرد في نافذة **Last Transactions** في PGW.
- **الرمز `BUSY` مع أي جهاز.** لا يترك PGW إلا طلبًا واحدًا يصل إلى الجهاز في الوقت نفسه، فالدفعة أو الاسترجاع الذي يُرسل وطلب آخر ما زال يعمل يرفضه PGW نفسه دون أن يصل إلى الجهاز، فلا يُخصم شيء بسببه. ويذكر السبب الطلب الجاري ووقت بدئه، مثل *Purchase Transaction refused - BUSY - The terminal is still busy with a payment of 1150 since 14:05:12. Finish or cancel it on the terminal and try again. If this continues, restart the PGW app*.

## رموز Geidea

هذه هي الرموز الثلاثية التي يعرفها نما. وكل رمز يبدأ بالرقم `9` معناه *Declined, System Error*.

| الرمز | المعنى المعروض | ما تفعله |
|---|---|---|
| 100، 102، 103، 105، 107، 108، 109، 110، 112، 114، 120، 122، 126، 128، 182، 183، 184، 185، 188، 190، 200، 202، 203، 205، 207 | *Declined* | رفض البنك البطاقة دون ذكر سبب. اطلب بطاقة أخرى أو وسيلة دفع أخرى. |
| 111، 118، 125، 129، 208، 209، 210 | *Declined, Contact your bank* | على العميل أن يراجع بنكه. اطلب بطاقة أخرى. |
| 101، 201 | *Expired Card, Contact your bank* | اطلب بطاقة أخرى. |
| 104 | *Restricted card, transaction not allowed* | اطلب بطاقة أخرى. |
| 115، 204 | *Transaction not allowed* | البطاقة لا تصلح لهذا النوع من المشتريات. اطلب بطاقة أخرى. |
| 119 | *Transaction not permitted to cardholder* | اطلب بطاقة أخرى. |
| 116 | *Not Enough Balance* | اطلب بطاقة أخرى، أو قسّم الدفع وخذ جزءًا منه بوسيلة أخرى. |
| 121 | *Exceeds withdrawal amount limit* | المبلغ أكبر من حد البطاقة. قسّم الدفع أو اطلب بطاقة أخرى. |
| 123 | *Declined, limits exceeded* | مثل 121. |
| 117 | *INVALID PIN* | دع العميل يحاول مرة أخرى بالرقم السري الصحيح. |
| 127 | *Wrong PIN* | مثل 117. |
| 106، 206 | *PIN Tries Exceeded* | أُغلق إدخال الرقم السري لهذه البطاقة. اطلب بطاقة أخرى. |
| 480، 481 | *Un successful* | أعد المحاولة مرة واحدة، فإن فشلت فخذ وسيلة دفع أخرى. |
| 501 | *RECONCILIATION UNSUCCESSFUL* | فشلت التسوية الخاصة بالجهاز مع مزوّد الخدمة. تواصل مع دعم Geidea بخصوص الجهاز. |
| 888 | *Error* | أعد المحاولة مرة واحدة، فإن تكرر فاضغط **Test Connection** في PGW. |
| أي رمز يبدأ بـ 9 | *Declined, System Error* | مشكلة لدى البنك أو شبكة البطاقات. أعد المحاولة بعد قليل أو خذ وسيلة دفع أخرى. |

## رموز Neoleap

هذه هي قيم `TerminalStatusCode` الثنائية، والقيمة `00` تعني أن الدفعة مقبولة.

| الرمز | المعنى | ما تفعله |
|---|---|---|
| 01 | Completed – transaction declined for different reasons (including invalid PIN), account not debited. | دع العميل يحاول مرة أخرى، أو اطلب بطاقة أخرى. |
| 02 | Completed – transaction rejected, account not debited. | اطلب بطاقة أخرى. |
| 11 | Cancelled by user, account not debited. | ألغى العميل أو الكاشير العملية على الجهاز. أعد الدفع إن لزم. |
| 12 | Void due to communication failure or some other reason, account not debited. | افحص اتصال الجهاز ثم أعد المحاولة. |
| 13 | Card Not Supported | اطلب بطاقة أخرى. |
| 14 | Transaction Not allowed | اطلب بطاقة أخرى. |
| 15 | Expired Card | اطلب بطاقة أخرى. |
| 16 | No Dial Tone (Phone line disconnected) | انقطع اتصال الجهاز نفسه بالبنك. افحص شبكته أو شريحته. |
| 17 | Card is not accepted. | اطلب بطاقة أخرى. |
| 86 | Incorrect Refund Card | اطلب بطاقة أخرى. |
| 87 | PIN locked. | اطلب بطاقة أخرى. |
| 88 | PIN timeout. | تأخر العميل في إدخال الرقم السري. أعد المحاولة. |
| 89 | Service is not accepted. | اطلب بطاقة أخرى. |
| 90 | Card removed after PIN entry. | أعد المحاولة واترك البطاقة حتى يطلب الجهاز سحبها. |
| 91 | Card removed Before PIN entry | مثل 90. |
| 92 | Card removed after sending request (ARQC check failed). | مثل 90. |
| 93 | Card Timeout. | أعد المحاولة. |
| 94 | Invalid PIN. | دع العميل يحاول مرة أخرى بالرقم السري الصحيح. |
| 95 | Invalid Amount. | راجع المبلغ في الفاتورة ثم أعد المحاولة. |
| 96 | Invalid Card (Blocked Card) | اطلب بطاقة أخرى. |
| 97 | EMV Application is Blocked | اطلب بطاقة أخرى. |
| 98 | Transaction declined by Card | اطلب بطاقة أخرى. |
| 99 | EMV Card not Detected by POS (Card not inserted into POS) | أدخل البطاقة أو مرّرها بشكل صحيح ثم أعد المحاولة. |

الدفعة المرفوضة لا تملأ سطر الدفع، فلا يوجد في نما ما يحتاج إلى إلغاء.
