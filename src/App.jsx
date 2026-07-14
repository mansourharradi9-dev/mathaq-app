import React, { useState, useMemo } from "react";
import {
  Search, X, Clock, Users, Flame, ChefHat, Megaphone, ArrowRight, ArrowLeft,
  Soup, Salad, Sandwich, Beef, Fish, Cookie, IceCream, Coffee,
  CupSoda, GlassWater, Wheat, Droplet, Leaf, Milk, Diamond, Donut,
  Drumstick, CakeSlice
} from "lucide-react";

const RECIPES = [
  { id: 1, name: "حمص بالطحينة", category: "مقبلات", time: "15 دقيقة", servings: "4 أشخاص", difficulty: "سهل", Icon: Salad, tone: "olive",
    desc: "حمص كريمي ناعم بالطحينة والليمون، يُقدَّم مع زيت الزيتون والصنوبر.",
    ingredients: ["حمص مسلوق", "طحينة", "ليمون", "ثوم", "زيت زيتون", "كمون"],
    steps: ["يُهرس الحمص جيدًا في الخلاط مع القليل من ماء السلق.", "تُضاف الطحينة والليمون والثوم والكمون.", "يُخلط حتى يصبح القوام ناعمًا كريميًا.", "يُسكب في طبق ويُزيّن بزيت الزيتون والصنوبر."] },
  { id: 2, name: "شوربة العدس", category: "مقبلات", time: "35 دقيقة", servings: "5 أشخاص", difficulty: "سهل", Icon: Soup, tone: "olive",
    desc: "شوربة دافئة وسريعة، غنية بالعدس الأصفر والكمون.",
    ingredients: ["عدس أصفر", "بصل", "جزر", "كمون", "ليمون", "مرق خضار"],
    steps: ["يُقلّى البصل حتى يذبل.", "يُضاف العدس والجزر والمرق ويُترك على النار حتى ينضج.", "يُهرس الخليط بالخلاط حتى يصبح ناعمًا.", "تُضاف البهارات وعصير الليمون قبل التقديم."] },
  { id: 3, name: "فتوش", category: "مقبلات", time: "15 دقيقة", servings: "4 أشخاص", difficulty: "سهل", Icon: Salad, tone: "olive",
    desc: "سلطة مقرمشة بالخبز المحمص ودبس الرمان.",
    ingredients: ["خس", "طماطم", "خيار", "فجل", "خبز محمص", "دبس رمان", "سماق"],
    steps: ["تُقطّع الخضار إلى مكعبات صغيرة.", "يُحمّص الخبز حتى يصبح مقرمشًا ويُكسّر.", "تُخلط المكونات مع زيت الزيتون ودبس الرمان.", "يُرش السماق ويُقدَّم فورًا."] },
  { id: 4, name: "تبولة", category: "مقبلات", time: "20 دقيقة", servings: "4 أشخاص", difficulty: "سهل", Icon: Leaf, tone: "olive",
    desc: "سلطة بقدونس منعشة بالبرغل والليمون.",
    ingredients: ["بقدونس مفروم ناعم", "برغل ناعم", "طماطم", "بصل أخضر", "ليمون", "زيت زيتون"],
    steps: ["يُنقع البرغل في الماء لعشر دقائق ويُصفّى.", "يُفرم البقدونس والطماطم والبصل ناعمًا جدًا.", "تُخلط جميع المكونات مع الليمون وزيت الزيتون.", "تُقدَّم باردة مع ورق الخس."] },
  { id: 5, name: "بابا غنوج", category: "مقبلات", time: "30 دقيقة", servings: "4 أشخاص", difficulty: "سهل", Icon: Flame, tone: "olive",
    desc: "متبّل الباذنجان المشوي بالطحينة، بنكهة دخانية مميزة.",
    ingredients: ["باذنجان", "طحينة", "ليمون", "ثوم", "زيت زيتون", "رمان للتزيين"],
    steps: ["يُشوى الباذنجان على النار حتى تسود القشرة وينضج اللب.", "يُقشّر ويُهرس اللب جيدًا.", "تُضاف الطحينة والثوم والليمون ويُخلط.", "يُقدَّم بزيت الزيتون وحبوب الرمان."] },
  { id: 6, name: "سمبوسة باللحم", category: "مقبلات", time: "45 دقيقة", servings: "6 أشخاص", difficulty: "متوسط", Icon: Sandwich, tone: "olive",
    desc: "عجينة مقرمشة محشوة بلحم مفروم متبّل، تُقلى حتى الذهبية.",
    ingredients: ["عجينة سمبوسة", "لحم مفروم", "بصل", "بهارات مشكلة", "زيت للقلي"],
    steps: ["يُقلّى اللحم مع البصل والبهارات حتى ينضج.", "تُحشى مثلثات العجينة بالخليط وتُطوى وتُغلق جيدًا.", "تُقلى في زيت ساخن حتى تصبح ذهبية ومقرمشة.", "تُقدَّم ساخنة مع الصلصة المفضلة."] },
  { id: 7, name: "فول مدمس", category: "مقبلات", time: "20 دقيقة", servings: "4 أشخاص", difficulty: "سهل", Icon: Soup, tone: "olive",
    desc: "فول دافئ بزيت الزيتون والليمون، وجبة مشبعة وبسيطة.",
    ingredients: ["فول مدمس معلب", "ليمون", "ثوم", "كمون", "زيت زيتون", "طماطم مفرومة"],
    steps: ["يُسخّن الفول على نار هادئة مع القليل من مائه.", "يُهرس جزء منه ويُترك جزء كامل للقوام.", "تُضاف البهارات والثوم والليمون.", "يُقدَّم بزيت الزيتون والطماطم الطازجة."] },
  { id: 8, name: "لبنة بزيت زيتون", category: "مقبلات", time: "10 دقائق", servings: "4 أشخاص", difficulty: "سهل", Icon: Droplet, tone: "olive",
    desc: "لبنة كريمية بارزة النكهة، تُقدَّم كطبق فطور أو مقبلات سريع.",
    ingredients: ["لبنة", "زيت زيتون", "زعتر بري", "نعناع مجفف", "خبز عربي"],
    steps: ["تُوضع اللبنة في طبق تقديم مسطح.", "يُصنع تجويف بسيط في المنتصف بالملعقة.", "يُسكب زيت الزيتون ويُرش الزعتر والنعناع.", "تُقدَّم مع الخبز العربي الساخن."] },
  { id: 9, name: "مقلوبة الدجاج", category: "أطباق رئيسية", time: "75 دقيقة", servings: "6 أشخاص", difficulty: "متوسط", Icon: Drumstick, tone: "paprika",
    desc: "طبقات من الأرز والدجاج والباذنجان المقلي، تُقلب رأسًا على عقب قبل التقديم.",
    ingredients: ["دجاج مقطع", "أرز بسمتي", "باذنجان", "بصل", "بهارات مقلوبة", "زيت للقلي"],
    steps: ["يُتبّل الدجاج ويُسلق مع البصل والبهارات حتى ينضج.", "يُقلى الباذنجان حتى يذبل ويصفّى من الزيت.", "تُرصّ الطبقات في قدر: دجاج ثم باذنجان ثم أرز.", "يُضاف مرق الدجاج ويُترك على نار هادئة حتى ينضج الأرز.", "تُقلب القدر في طبق التقديم وهي ساخنة."] },
  { id: 10, name: "كباب مشوي", category: "أطباق رئيسية", time: "40 دقيقة", servings: "4 أشخاص", difficulty: "متوسط", Icon: Flame, tone: "paprika",
    desc: "لحم مفروم متبّل بالبصل والبقدونس ويُشوى على الفحم.",
    ingredients: ["لحم مفروم", "بصل مبشور", "بقدونس", "بهارات كباب", "ملح"],
    steps: ["يُعجن اللحم مع البصل والبقدونس والبهارات جيدًا.", "يُشكّل على أسياخ ويُترك ليرتاح في الثلاجة.", "يُشوى على الفحم مع التقليب حتى النضج.", "يُقدَّم مع الخبز والسلطة."] },
  { id: 11, name: "منسف", category: "أطباق رئيسية", time: "120 دقيقة", servings: "8 أشخاص", difficulty: "صعب", Icon: Beef, tone: "paprika",
    desc: "الطبق الأردني الشهير، لحم طري بصلصة اللبن الجميد فوق أرز وشراك.",
    ingredients: ["لحم غنم", "جميد (لبن مجفف)", "أرز", "خبز شراك", "لوز محمص", "سمن"],
    steps: ["يُسلق اللحم حتى يصبح طريًا جدًا.", "يُذاب الجميد بالماء ويُطبخ مع مرق اللحم حتى يتماسك.", "يُطهى الأرز بالسمن حتى ينضج.", "تُرصّ طبقات الخبز والأرز واللحم ويُسكب فوقها صلصة الجميد.", "يُزيّن باللوز المحمص ويُقدَّم ساخنًا."] },
  { id: 12, name: "كبسة دجاج", category: "أطباق رئيسية", time: "60 دقيقة", servings: "6 أشخاص", difficulty: "متوسط", Icon: Drumstick, tone: "paprika",
    desc: "أرز خليجي معطّر بالبهارات مع دجاج مطهو حتى النضج الكامل.",
    ingredients: ["دجاج", "أرز بسمتي", "طماطم", "بصل", "بهارات كبسة", "زبيب ولوز للتزيين"],
    steps: ["يُقلّى البصل ثم يُضاف الدجاج حتى يتحمّر.", "تُضاف الطماطم والبهارات ويُطهى قليلًا.", "يُضاف الأرز والماء ويُترك حتى ينضج على نار هادئة.", "يُقدَّم الأرز والدجاج مع الزبيب واللوز المحمص."] },
  { id: 13, name: "ملوخية", category: "أطباق رئيسية", time: "50 دقيقة", servings: "6 أشخاص", difficulty: "متوسط", Icon: Soup, tone: "paprika",
    desc: "طبق ورقي أخضر بمرقة الثوم والكزبرة، يُقدَّم مع الأرز.",
    ingredients: ["ملوخية مفرومة", "ثوم", "كزبرة يابسة", "مرق دجاج", "أرز", "ليمون"],
    steps: ["يُقلى الثوم والكزبرة في السمن حتى تفوح الرائحة.", "يُضاف مرق الدجاج ويُترك يغلي.", "تُضاف الملوخية وتُطهى على نار هادئة دون أن تُغلى بقوة.", "تُقدَّم فوق الأرز الأبيض مع الليمون."] },
  { id: 14, name: "محشي ورق عنب", category: "أطباق رئيسية", time: "90 دقيقة", servings: "6 أشخاص", difficulty: "صعب", Icon: Leaf, tone: "paprika",
    desc: "ورق عنب ملفوف بحشوة الأرز واللحم، يُطهى ببطء حتى يتشرب النكهة.",
    ingredients: ["ورق عنب", "أرز", "لحم مفروم", "طماطم", "ليمون", "بهارات محشي"],
    steps: ["يُخلط الأرز مع اللحم المفروم والبهارات.", "تُلف أوراق العنب حول الحشوة بإحكام.", "تُرصّ في قدر مع شرائح طماطم في القاع.", "يُضاف الماء والليمون وتُطهى على نار هادئة حتى ينضج الأرز."] },
  { id: 15, name: "مسخن", category: "أطباق رئيسية", time: "70 دقيقة", servings: "6 أشخاص", difficulty: "متوسط", Icon: Drumstick, tone: "paprika",
    desc: "خبز طابون مغطى بالدجاج والبصل المحمّر والسماق.",
    ingredients: ["دجاج", "بصل مقطع", "سماق", "خبز طابون أو صاج", "زيت زيتون", "صنوبر"],
    steps: ["يُحمّر البصل مع السماق وزيت الزيتون حتى يذبل.", "يُشوى أو يُقلى الدجاج حتى ينضج.", "يُفرش الخبز في صينية ويُغطى بالبصل ثم الدجاج.", "يُرش بزيت الزيتون والصنوبر المحمص ويُقدَّم ساخنًا."] },
  { id: 16, name: "سمك مشوي", category: "أطباق رئيسية", time: "35 دقيقة", servings: "4 أشخاص", difficulty: "سهل", Icon: Fish, tone: "paprika",
    desc: "سمك طازج متبّل بالثوم والكزبرة ومشوي حتى ينضج بلطف.",
    ingredients: ["سمك كامل أو فيليه", "ثوم", "كزبرة طازجة", "ليمون", "كمون", "زيت زيتون"],
    steps: ["يُتبّل السمك بخليط الثوم والكزبرة والبهارات.", "يُترك يرتاح في الثلاجة نصف ساعة.", "يُشوى على نار متوسطة حتى ينضج من الجهتين.", "يُقدَّم مع الليمون والأرز أو السلطة."] },
  { id: 17, name: "برياني لحم", category: "أطباق رئيسية", time: "80 دقيقة", servings: "6 أشخاص", difficulty: "صعب", Icon: Beef, tone: "paprika",
    desc: "أرز بسمتي معطّر بالهيل والزعفران مع لحم طري ومكسرات.",
    ingredients: ["لحم", "أرز بسمتي", "زعفران", "هيل وقرفة", "بصل مقلي", "مكسرات"],
    steps: ["يُطهى اللحم مع البهارات حتى يصبح طريًا.", "يُنقع الأرز ثم يُسلق نصف نضج.", "تُرصّ طبقات اللحم والأرز مع الزعفران المذاب.", "يُطهى على نار هادئة جدًا حتى يكتمل النضج ويُزيّن بالبصل المقلي والمكسرات."] },
  { id: 18, name: "شاورما دجاج", category: "أطباق رئيسية", time: "40 دقيقة", servings: "4 أشخاص", difficulty: "متوسط", Icon: Sandwich, tone: "paprika",
    desc: "شرائح دجاج متبّلة بخلطة الشاورما، تُقدَّم في الخبز مع الثومية.",
    ingredients: ["صدور دجاج مقطعة شرائح", "بهارات شاورما", "ثوم", "خبز عربي", "ثومية", "مخلل"],
    steps: ["يُتبّل الدجاج ببهارات الشاورما والثوم ويُترك ليتشرب النكهة.", "يُقلى أو يُشوى على نار عالية حتى يتحمّر ويحمّص جيدًا.", "يُلف الدجاج في الخبز مع الثومية والمخلل.", "يُقدَّم ساخنًا فور التحضير."] },
  { id: 19, name: "كنافة بالجبن", category: "حلويات", time: "50 دقيقة", servings: "8 أشخاص", difficulty: "متوسط", Icon: CakeSlice, tone: "mustard",
    desc: "عجينة كنافة ذهبية مقرمشة تُحشى بالجبن وتُغمر بالقطر البارد.",
    ingredients: ["عجينة كنافة", "جبن قليل الملح", "سمن", "قطر", "فستق مطحون"],
    steps: ["تُفرك عجينة الكنافة بالسمن جيدًا.", "يُفرش نصفها في صينية، ويُوضع الجبن فوقها.", "تُغطى بالنصف الآخر وتُخبز حتى تذهب.", "يُسكب القطر البارد فور الخروج من الفرن.", "تُزيّن بالفستق وتُقدّم دافئة."] },
  { id: 20, name: "أرز بالحليب", category: "حلويات", time: "30 دقيقة", servings: "6 أشخاص", difficulty: "سهل", Icon: Milk, tone: "mustard",
    desc: "حلا بارد وناعم بنكهة ماء الورد والقرفة.",
    ingredients: ["أرز", "حليب", "سكر", "نشا", "ماء ورد", "قرفة للتزيين"],
    steps: ["يُسلق الأرز مع القليل من الماء حتى يلين.", "يُضاف الحليب والسكر ويُترك يغلي على نار هادئة.", "يُذاب النشا بقليل من الحليب البارد ويُضاف تدريجيًا.", "يُسكب في أكواب التقديم ويُبرّد، ويُرش بالقرفة."] },
  { id: 21, name: "بقلاوة", category: "حلويات", time: "60 دقيقة", servings: "10 قطع", difficulty: "صعب", Icon: Diamond, tone: "mustard",
    desc: "طبقات رقيقة من عجينة الفيلو والمكسرات، مقرمشة ومغطاة بالقطر.",
    ingredients: ["عجينة فيلو", "جوز أو فستق مطحون", "سمن مذاب", "قطر", "قرفة"],
    steps: ["تُدهن طبقات الفيلو بالسمن طبقة فوق طبقة.", "يُوزّع المكسرات بين الطبقات.", "تُقطّع معينات قبل الخبز وتُخبز حتى تذهب.", "يُسكب القطر البارد على الصينية الساخنة مباشرة."] },
  { id: 22, name: "معمول بالتمر", category: "حلويات", time: "90 دقيقة", servings: "20 قطعة", difficulty: "متوسط", Icon: Cookie, tone: "mustard",
    desc: "كعك السميد المحشو بعجينة التمر، طبق أساسي في المناسبات.",
    ingredients: ["سميد", "زبدة", "تمر معجون", "ماء ورد", "سكر بودرة للتزيين"],
    steps: ["يُعجن السميد مع الزبدة ويُترك يرتاح ليلة.", "تُشكّل كرات ويُوضع بداخلها حشوة التمر.", "تُشكّل بقالب المعمول أو باليد.", "تُخبز حتى ينضج القاع وتُرش بالسكر البودرة بعد التبريد."] },
  { id: 23, name: "أم علي", category: "حلويات", time: "45 دقيقة", servings: "6 أشخاص", difficulty: "سهل", Icon: CakeSlice, tone: "mustard",
    desc: "حلا مصري دافئ من العجين والحليب والمكسرات، يُقدَّم فور خروجه من الفرن.",
    ingredients: ["عجين ورقي أو كرواسون", "حليب", "قشطة", "مكسرات مشكلة", "سكر", "زبيب"],
    steps: ["يُقطّع العجين ويُحمّص قليلًا في الفرن.", "يُوزّع في صينية مع المكسرات والزبيب.", "يُسخّن الحليب مع السكر ويُسكب فوق العجين.", "تُضاف القشطة على الوجه وتُخبز حتى تتحمّر."] },
  { id: 24, name: "بسبوسة", category: "حلويات", time: "40 دقيقة", servings: "12 قطعة", difficulty: "سهل", Icon: CakeSlice, tone: "mustard",
    desc: "كيكة السميد الطرية المنقوعة بالقطر، بسيطة وسريعة التحضير.",
    ingredients: ["سميد", "جوز هند", "لبن زبادي", "سكر", "قطر", "لوز للتزيين"],
    steps: ["تُخلط جميع المكونات الجافة والسائلة معًا حتى تتجانس.", "يُسكب الخليط في صينية مدهونة وتُزيّن بشرائح اللوز.", "تُخبز حتى يصبح الوجه ذهبيًا.", "يُسكب القطر البارد على الصينية الساخنة مباشرة."] },
  { id: 25, name: "لقيمات", category: "حلويات", time: "40 دقيقة", servings: "6 أشخاص", difficulty: "متوسط", Icon: Donut, tone: "mustard",
    desc: "كرات عجين مقلية مقرمشة من الخارج وطرية من الداخل، تُغمس بالقطر أو العسل.",
    ingredients: ["دقيق", "خميرة", "ماء دافئ", "سكر", "زيت للقلي", "قطر أو عسل"],
    steps: ["تُعجن العجينة وتُترك تختمر حتى يتضاعف حجمها.", "تُشكّل كرات صغيرة بالملعقة أو اليد.", "تُقلى في زيت ساخن حتى تصبح ذهبية من كل الجهات.", "تُغمس بالقطر أو العسل وتُقدَّم دافئة."] },
  { id: 26, name: "مهلبية", category: "حلويات", time: "25 دقيقة", servings: "6 أشخاص", difficulty: "سهل", Icon: IceCream, tone: "mustard",
    desc: "حلا بارد ناعم بنكهة ماء الزهر، يُزيّن بالفستق المطحون.",
    ingredients: ["حليب", "نشا", "سكر", "ماء زهر", "فستق مطحون للتزيين"],
    steps: ["يُذاب النشا في القليل من الحليب البارد.", "يُسخّن باقي الحليب مع السكر حتى يغلي.", "يُضاف خليط النشا تدريجيًا مع التحريك المستمر حتى يتماسك.", "يُسكب في أكواب ويُبرّد ثم يُزيّن بالفستق."] },
  { id: 27, name: "عصير التمر هندي", category: "مشروبات", time: "20 دقيقة", servings: "6 أكواب", difficulty: "سهل", Icon: CupSoda, tone: "teal",
    desc: "مشروب منعش حامض حلو، مثالي في أيام الصيف.",
    ingredients: ["تمر هندي", "سكر", "ماء", "ثلج"],
    steps: ["يُنقع التمر الهندي في الماء الساخن لمدة ساعة.", "يُصفّى جيدًا من البذور والألياف.", "يُضاف السكر ويُخلط حتى يذوب.", "يُقدَّم باردًا مع الثلج."] },
  { id: 28, name: "عصير ليمون بالنعناع", category: "مشروبات", time: "10 دقائق", servings: "4 أكواب", difficulty: "سهل", Icon: GlassWater, tone: "teal",
    desc: "مشروب منعش وسريع بطعم حمضي منعش وأوراق نعناع طازجة.",
    ingredients: ["ليمون", "نعناع طازج", "سكر", "ماء", "ثلج"],
    steps: ["يُعصر الليمون ويُصفّى من البذور.", "يُخلط عصير الليمون مع السكر والماء والنعناع في الخلاط.", "يُصفّى الخليط إذا رغبت بقوام أنعم.", "يُقدَّم باردًا جدًا مع الثلج وأوراق نعناع للتزيين."] },
  { id: 29, name: "شاي كرك", category: "مشروبات", time: "15 دقيقة", servings: "4 أكواب", difficulty: "سهل", Icon: Coffee, tone: "teal",
    desc: "شاي حليب غني بالهيل والزعفران، مشروب خليجي شعبي أصيل.",
    ingredients: ["شاي أحمر", "حليب", "ماء", "هيل", "زعفران", "سكر"],
    steps: ["يُغلى الماء مع الشاي والهيل لبضع دقائق.", "يُضاف الحليب ويُترك يغلي على نار متوسطة.", "يُضاف الزعفران والسكر ويُترك حتى يتشرّب اللون والنكهة.", "يُصفّى ويُقدَّم ساخنًا."] },
  { id: 30, name: "قهوة عربية", category: "مشروبات", time: "20 دقيقة", servings: "6 فناجين", difficulty: "متوسط", Icon: Coffee, tone: "teal",
    desc: "قهوة خفيفة معطّرة بالهيل والزعفران، تُقدَّم تقليديًا مع التمر.",
    ingredients: ["بن عربي مطحون خفيف التحميص", "هيل مطحون", "زعفران", "ماء"],
    steps: ["يُغلى الماء في الدلة.", "يُضاف البن ويُترك يغلي على نار هادئة لعشر دقائق.", "يُضاف الهيل والزعفران ويُترك على النار قليلًا.", "تُترك القهوة لترتاح ثم تُقدَّم في فناجين صغيرة مع التمر."] },
];

const CATEGORIES = ["الكل", "مقبلات", "أطباق رئيسية", "حلويات", "مشروبات"];

const TONES = {
  paprika: { bg: "#C1502E", ring: "#8C3A20", pattern: "diagonal" },
  mustard: { bg: "#D9A441", ring: "#9C7325", pattern: "wave" },
  olive: { bg: "#7C8A52", ring: "#576139", pattern: "dots" },
  teal: { bg: "#3E7C7C", ring: "#2A5757", pattern: "drip" },
};

function patternStyle(tone) {
  const base = TONES[tone];
  const light = "rgba(255,255,255,0.16)";
  switch (base.pattern) {
    case "diagonal":
      return { backgroundColor: base.bg, backgroundImage: `repeating-linear-gradient(45deg, ${light} 0px, ${light} 2px, transparent 2px, transparent 14px)` };
    case "wave":
      return { backgroundColor: base.bg, backgroundImage: `radial-gradient(circle at 20% 30%, ${light} 0%, transparent 45%), radial-gradient(circle at 80% 70%, ${light} 0%, transparent 45%)` };
    case "dots":
      return { backgroundColor: base.bg, backgroundImage: `radial-gradient(${light} 1.5px, transparent 1.5px)`, backgroundSize: "14px 14px" };
    case "drip":
      return { backgroundColor: base.bg, backgroundImage: `repeating-linear-gradient(90deg, ${light} 0px, ${light} 3px, transparent 3px, transparent 18px)` };
    default:
      return { backgroundColor: base.bg };
  }
}

function AdSlot({ variant = "card" }) {
  const sizing =
    variant === "banner" ? "h-20 md:h-24" : variant === "inline" ? "h-16" : "h-full min-h-[280px]";
  return (
    <div
      className={`${sizing} w-full rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1 text-center px-4`}
      style={{ borderColor: "#B9AE93", backgroundColor: "#EFE7D2", color: "#7A6F55" }}
    >
      <Megaphone size={18} strokeWidth={1.75} />
      <span className="text-xs" style={{ fontFamily: "Tajawal, sans-serif" }}>
        مساحة إعلانية — تُملأ لاحقًا عند ربط شبكة إعلانات حقيقية بعد نشر التطبيق
      </span>
    </div>
  );
}

function RecipeCard({ recipe, onOpen }) {
  const tone = TONES[recipe.tone];
  const Icon = recipe.Icon;
  return (
    <button
      onClick={() => onOpen(recipe)}
      className="text-right w-full rounded-lg overflow-hidden relative group transition-transform duration-200 hover:-translate-y-1"
      style={{ backgroundColor: "#FBF6E9", border: "1px solid #E4D9BC" }}
    >
      <div className="h-32 flex items-center justify-center relative" style={patternStyle(recipe.tone)}>
        <Icon size={42} strokeWidth={1.5} color="#FBF6E9" />
        <div
          className="absolute -bottom-4 left-4 w-12 h-12 rounded-full flex items-center justify-center text-[10px] font-bold rotate-[-8deg] shadow-md"
          style={{ backgroundColor: "#FBF6E9", border: `2px solid ${tone.ring}`, color: tone.ring, fontFamily: "Tajawal, sans-serif" }}
        >
          {recipe.difficulty}
        </div>
      </div>
      <div className="p-4 pt-6">
        <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "Amiri, serif", color: "#241C15" }}>{recipe.name}</h3>
        <p className="text-xs mb-3 leading-relaxed" style={{ color: "#5B5240", fontFamily: "Tajawal, sans-serif", minHeight: "2.5rem" }}>{recipe.desc}</p>
        <div className="flex items-center gap-3 text-[11px]" style={{ color: "#7A6F55", fontFamily: "Tajawal, sans-serif" }}>
          <span className="flex items-center gap-1"><Clock size={12} /> {recipe.time}</span>
          <span className="flex items-center gap-1"><Users size={12} /> {recipe.servings}</span>
        </div>
      </div>
    </button>
  );
}

function RecipeDetail({ recipe, onClose, onPrev, onNext, position }) {
  const tone = TONES[recipe.tone];
  const Icon = recipe.Icon;
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6" style={{ backgroundColor: "rgba(23,36,43,0.6)" }} onClick={onClose}>
      <div
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
        className="fixed top-3 left-3 right-3 z-[70] flex items-center justify-between px-2 py-2 rounded-full shadow-md md:max-w-xl md:mx-auto"
        style={{ backgroundColor: "#FBF6E9" }}
      >
        <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#F6EFDD" }} aria-label="إغلاق">
          <X size={18} color="#241C15" />
        </button>
        <div className="flex items-center gap-1">
          <button onClick={onPrev} className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1.5 rounded-full" style={{ fontFamily: "Tajawal, sans-serif", color: tone.ring, backgroundColor: "#F6EFDD" }}>
            <ArrowRight size={13} color={tone.ring} strokeWidth={2.25} /> السابقة
          </button>
          <span className="text-[10px] px-1" style={{ fontFamily: "Tajawal, sans-serif", color: "#9C917A" }}>{position}</span>
          <button onClick={onNext} className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1.5 rounded-full" style={{ fontFamily: "Tajawal, sans-serif", color: tone.ring, backgroundColor: "#F6EFDD" }}>
            التالية <ArrowLeft size={13} color={tone.ring} strokeWidth={2.25} />
          </button>
        </div>
      </div>
      <div onClick={(e) => e.stopPropagation()} className="w-full md:max-w-xl max-h-[90vh] overflow-y-auto rounded-t-2xl md:rounded-2xl relative" style={{ backgroundColor: "#FBF6E9" }}>
        <div className="h-32 flex items-center justify-center relative" style={patternStyle(recipe.tone)}>
          <Icon size={56} strokeWidth={1.5} color="#FBF6E9" />
        </div>
        <div className="p-6" dir="rtl">
          <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "Amiri, serif", color: "#241C15" }}>{recipe.name}</h2>
          <p className="text-sm mb-4" style={{ color: "#5B5240", fontFamily: "Tajawal, sans-serif" }}>{recipe.desc}</p>
          <div className="flex gap-4 mb-5 text-xs" style={{ color: "#7A6F55", fontFamily: "Tajawal, sans-serif" }}>
            <span className="flex items-center gap-1"><Clock size={13}/> {recipe.time}</span>
            <span className="flex items-center gap-1"><Users size={13}/> {recipe.servings}</span>
            <span className="flex items-center gap-1"><Flame size={13}/> {recipe.difficulty}</span>
          </div>
          <h4 className="font-bold mb-2 text-sm" style={{ fontFamily: "Tajawal, sans-serif", color: tone.ring }}>المكوّنات</h4>
          <ul className="mb-5 space-y-1.5">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="text-sm flex items-center gap-2" style={{ fontFamily: "Tajawal, sans-serif", color: "#241C15" }}>
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: tone.bg }} />{ing}
              </li>
            ))}
          </ul>
          <div className="mb-5"><AdSlot variant="inline" /></div>
          <h4 className="font-bold mb-2 text-sm" style={{ fontFamily: "Tajawal, sans-serif", color: tone.ring }}>طريقة التحضير</h4>
          <ol className="space-y-3">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm" style={{ fontFamily: "Tajawal, sans-serif", color: "#241C15" }}>
                <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: tone.bg, color: "#FBF6E9" }}>{i + 1}</span>
                <span className="leading-relaxed pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default function MathaqApp() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("الكل");
  const [active, setActive] = useState(null);

  const filtered = useMemo(() => {
    return RECIPES.filter((r) => {
      const matchesCat = category === "الكل" || r.category === category;
      const matchesQuery = r.name.includes(query) || r.desc.includes(query);
      return matchesCat && matchesQuery;
    });
  }, [query, category]);

  const gridItems = [];
  filtered.forEach((r, i) => {
    gridItems.push({ type: "recipe", data: r, key: `r-${r.id}` });
    if ((i + 1) % 6 === 0) gridItems.push({ type: "ad", key: `ad-${i}` });
  });

  const activeIndex = active ? filtered.findIndex((r) => r.id === active.id) : -1;
  const goPrev = () => {
    if (activeIndex === -1) return;
    const prevIndex = (activeIndex - 1 + filtered.length) % filtered.length;
    setActive(filtered[prevIndex]);
  };
  const goNext = () => {
    if (activeIndex === -1) return;
    const nextIndex = (activeIndex + 1) % filtered.length;
    setActive(filtered[nextIndex]);
  };

  return (
    <div dir="rtl" className="min-h-screen" style={{ backgroundColor: "#F6EFDD" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Tajawal:wght@400;500;700&display=swap');`}</style>
      <header style={{ backgroundColor: "#17242B" }} className="pb-8">
        <div className="max-w-5xl mx-auto px-5 pt-8">
          <div className="flex items-center gap-2 mb-1">
            <ChefHat size={22} color="#D9A441" />
            <span className="text-2xl font-bold" style={{ fontFamily: "Amiri, serif", color: "#F6EFDD" }}>مذاق</span>
          </div>
          <p className="text-sm mb-6" style={{ fontFamily: "Tajawal, sans-serif", color: "#A9B0AC" }}>وصفات بيتية بسيطة، من مطبخنا إلى مطبخك · {RECIPES.length} وصفة</p>
          <div className="relative">
            <Search size={18} className="absolute top-1/2 -translate-y-1/2 right-4" color="#7A6F55" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ابحث عن وصفة..." className="w-full rounded-full py-3 pr-12 pl-4 text-sm outline-none" style={{ backgroundColor: "#F6EFDD", fontFamily: "Tajawal, sans-serif", color: "#241C15" }} />
          </div>
          <div className="flex gap-2 flex-wrap mt-4">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)} className="px-4 py-1.5 rounded-full text-xs font-medium transition-colors" style={{ fontFamily: "Tajawal, sans-serif", backgroundColor: category === cat ? "#D9A441" : "transparent", color: category === cat ? "#17242B" : "#D9A441", border: "1px solid #D9A441" }}>{cat}</button>
            ))}
          </div>
        </div>
      </header>
      <div className="max-w-5xl mx-auto px-5 -mt-4 mb-8 relative z-10"><AdSlot variant="banner" /></div>
      <main className="max-w-5xl mx-auto px-5 pb-16">
        {gridItems.length === 0 ? (
          <div className="text-center py-20" style={{ fontFamily: "Tajawal, sans-serif", color: "#7A6F55" }}>لا توجد وصفات مطابقة لبحثك.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {gridItems.map((item) =>
              item.type === "recipe" ? (
                <RecipeCard key={item.key} recipe={item.data} onOpen={setActive} />
              ) : (
                <div key={item.key} className="rounded-lg overflow-hidden"><AdSlot variant="card" /></div>
              )
            )}
          </div>
        )}
      </main>
      <footer className="text-center pb-8 text-xs" style={{ fontFamily: "Tajawal, sans-serif", color: "#9C917A" }}>
        <p className="flex items-center justify-center gap-1">مذاق — تطبيق تجريبي للوصفات <ArrowRight size={12} /></p>
      </footer>
      {active && (
        <RecipeDetail
          recipe={active}
          onClose={() => setActive(null)}
          onPrev={goPrev}
          onNext={goNext}
          position={`${activeIndex + 1} / ${filtered.length}`}
        />
      )}
    </div>
  );
  }
