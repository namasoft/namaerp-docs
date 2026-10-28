---
description: "The nine carton lookup files a carton specification picks from: CRTN Type and its starch level, Corrugating Factor and Corrugating Type, Pattern and its sheet formulas, Printing Type and its maximum sheet length, and the descriptive Fluting, Join, Slotting and Loading types."
entities: [CRTNType, CRTNCorrugatingFactor, CRTNCorrugatingType, CRTNPattern, CRTNPrintingType, CRTNFluting, CRTNJoinType, CRTNSlottingType, CRTNLoadingType]
---
# Carton Lookup Files

Every carton specification picks from a handful of small lookup files, all under **Manufacturing → Cartoon**: CRTN Type, CRTN Fluting, CRTN Join Type, CRTN Slotting Type, CRTN Corrugating Factor, CRTNCorrugatingType, CRTN Loading Type, CRTN Pattern and Printing Type. Each is a code and a name, and five of them carry one or two values that the specification's calculations and checks actually use. Set them up once, before the first [carton specification](/modules/manufacturing/carton-specifications); the specifications then fill and check themselves from them.

All lengths in the carton screens are in **centimetres**. A pattern formula, a maximum sheet length and a sheet dimension typed in millimetres will make every figure ten times too large.

## The four that drive calculations

### CRTN Type — the board, and its starch

A carton type (نوع الكرتونه) names a kind of board — single wall, double wall, and so on — and carries a **Starch Level** (منسوب النشا), the grams of starch per square metre that bond the layers.

- Choosing a type on a specification copies its starch level into the specification's **Starch Level**.
- Saving the specification refuses a starch level that differs from the type's. A type with no starch level is not checked.
- The starch level is part of the carton weight: the layers' weights plus the starch level, times the sheet area.

### CRTN Corrugating Factor and Corrugating Type — how much paper the flute eats

A **Corrugating Factor** (معامل التضليع) holds one number, the **Measures Factor** (المعامل): how much more paper a fluted layer uses than a flat one. A B flute at 1.34 uses 34% more paper per square metre of board; a C flute at 1.44 uses 44% more.

A **Corrugating Type** (نوع التضليع) ties a factor to a board: it has a **Carton Type** and a **Corrugating Factor**. On the specification's production stage lines:

- the Corrugating Type list shows only types of the specification's carton type, and, when the line already has a factor, only types with that factor;
- choosing a corrugating type copies its factor onto the line;
- saving refuses a line whose factor differs from its corrugating type's factor.

The factor multiplies the layer's weight in the carton weight, and [carton material planning](/modules/manufacturing/carton-material-planning) uses it to work out how much fluting paper the plan has to find. A layer with no factor counts as 1.

### CRTN Pattern — the sheet formulas

A pattern (نمط الكرتونة) holds a **Length Formula** (معادلة الطول) and a **Width Formula** (معادلة العرض) that work out the flat sheet from the carton's measurements. A new pattern starts with `(l+w)*2 + f` and `w+h`. The formulas can use:

| Letter | Means |
|---|---|
| `l`, `w`, `h` | The carton's length, width and height |
| `f` | The specification's **Flap Value** (اللسان) |
| `ml`, `mw`, `mh` | The crease mold's length, width and height, when the specification has a crease mold |

Saving the pattern tries each formula and refuses one it cannot calculate. On the specification, a crease mold's formulas win over the pattern's, and neither is applied when a multiplication length or width is filled. The worked example is in [Using Formulas for Sheet Calculations](/modules/manufacturing/carton-specifications#Using-Formulas-for-Sheet-Calculations).

### Printing Type — the press, and its longest sheet

A printing type (نوع الطباعة) names a press or printing process and can carry a **Max Sheet Length** (أقصى طول للشيت). Saving a specification refuses a sheet longer than that. A printing type with the box empty or zero sets no limit.

## The four that only describe

**CRTN Fluting** (الريجة), **CRTN Join Type** (نوع التقفيل), **CRTN Slotting Type** (نوع التفتيح) and **CRTN Loading Type** (نوع التحميل) are named lists. You pick them on the specification so that the production floor and the customer see what the carton is — E flute, glued or stitched, which slotting, how the finished cartons are stacked — but no calculation or check reads them. Keep them short and consistent; they are labels, not settings.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *The equation: {0} is not valid* — «المعادلة: {0} غير صحيحة» | A pattern formula uses a letter that is not in the table above, or is not a valid formula. | Write it with `l`, `w`, `h`, `f`, `ml`, `mw`, `mh`, numbers and `+ - * / ( )` only. |

The messages a specification raises against these files — a starch level, corrugating factor or sheet length that does not match — are listed on [Carton Specifications](/modules/manufacturing/carton-specifications#Messages-you-may-see).
