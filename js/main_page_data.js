const UI_TEXT = {
    ru: {
        imageUnavailable: 'Изображение недоступно',
        themeDark: 'Включить тёмную тему',
        themeLight: 'Включить светлую тему'
    },
    en: {
        imageUnavailable: 'Image unavailable',
        themeDark: 'Switch to dark theme',
        themeLight: 'Switch to light theme'
    },
    zh: {
        imageUnavailable: '图片无法显示',
        themeDark: '切换到深色模式',
        themeLight: '切换到浅色模式'
    }
};

const mainPageData = {
    ru: {
        introTitle: "Путеводитель по городам России",
        introSubtitle: "Откройте для себя удивительные места нашей страны",
        introText: "Исследуйте культурное и природное богатство российских регионов. Готовые маршруты по ключевым городам и регионам — идеальные для полноценного отпуска. Каждая локация представлена с подробным описанием для удобного планирования вашего путешествия.",
        regionsTitle: "Регионы",
        citiesTitle: "Города",
        buttonText: "Изучить →",
        regions: [

            {
                title: "Московская область",
                link: "city/moscow_region/index_ru.html",
                img: "img/main_page/cards/Mos_obl_card.jpg"
            },
            {
                title: "Ленинградская область",
                link: "city/leningragskaya_oblast/index_ru.html",
                img: "img/main_page/cards/Len_obl_card.jpg"
            },
            {
                title: "Краснодарский край",
                link: "city/krasnodarskii_krai/index_ru.html",
                img: "img/main_page/cards/Kras_kray_card.jpg"
            },
            {
                title: "Калининградская область",
                link: "city/kalinigradskaya_oblast/index_ru.html",
                img: "img/main_page/cards/Kalin_obl_card.jpg"
            },
            {
                title: "Красноярский край",
                link: "city/krasnoyarsk/index_ru.html",
                img: "img/main_page/cards/krasnoyarsk.jpg"
            },
            {
                title: "Приморский край",
                link: "city/primorsk/index_ru.html",
                img: "img/main_page/cards/primorsk.jpg"
            },
            {
                title: "Камчатский край",
                link: "city/kamchatka/index_ru.html",
                img: "img/main_page/cards/kamchatka.jpg"
            },
            {
                title: "Сахалинская область",
                link: "city/sahalin/index_ru.html",
                img: "img/main_page/cards/sahalin.jpg"
            },
            {
                title: "Республика Алтай",
                link: "city/altai/index_ru.html",
                img: "img/main_page/cards/altai.jpg"
            },
            {
                title: "Мурманская область",
                link: "city/murmansk/index_ru.html",
                img: "img/main_page/cards/murmansk.jpg"
            },
            {
                title: "Иркутская область",
                link: "city/irkutsk/index_ru.html",
                img: "img/main_page/cards/ircutsk.jpg"
            },
            {
                title: "Республика Татарстан",
                link: "city/tatarstan/index_ru.html",
                img: "img/main_page/cards/tatarstan.jpg"
            },
            {
                title: "Ставропольский край",
                link: "city/stavropol/index_ru.html",
                img: "img/main_page/cards/stavropol.jpg"
            },
            {
                title: "Самарская область",
                link: "city/samara/index_ru.html",
                img: "img/main_page/cards/samara.jpg"
            }

        ],
        cities: [

            {
                title: "Москва",
                link: "city/moscow/index_ru.html",
                img: "img/main_page/cards/moskow.jpg"
            },
            {
                title: "Санкт-Петербург",
                link: "city/stpetersburg/index_ru.html",
                img: "img/main_page/cards/petersburg.jpg"
            },
            {
                title: "Сочи",
                link: "city/sochi/index_ru.html",
                img: "img/main_page/cards/sochi.jpg"
            }

        ]
    },

    en: {
        introTitle: "Russia City Guide",
        introSubtitle: "Discover amazing places in our country",
        introText: "Explore the cultural and natural wealth of Russian regions. Ready-made routes through key cities and regions, perfect for a full-fledged vacation. Each location comes with a detailed description for easy travel planning.",
        regionsTitle: "Regions",
        citiesTitle: "Cities",
        buttonText: "Explore →",
        regions: [

            {
                title: "Moscow Region",
                link: "city/moscow_region/index_en.html",
                img: "img/main_page/cards/Mos_obl_card.jpg"
            },
            {
                title: "Leningrad Region",
                link: "city/leningragskaya_oblast/index_en.html",
                img: "img/main_page/cards/Len_obl_card.jpg"
            },
            {
                title: "Krasnodar Region",
                link: "city/krasnodarskii_krai/index_en.html",
                img: "img/main_page/cards/Kras_kray_card.jpg"
            },
            {
                title: "Kaliningrad Region",
                link: "city/kalinigradskaya_oblast/index_en.html",
                img: "img/main_page/cards/Kalin_obl_card.jpg"
            },
            {
                title: "Krasnoyarsk Region",
                link: "city/krasnoyarsk/index_en.html",
                img: "img/main_page/cards/krasnoyarsk.jpg"
            },
            {
                title: "Primorsky Region",
                link: "city/primorsk/index_en.html",
                img: "img/main_page/cards/primorsk.jpg"
            },
            {
                title: "Kamchatka Region",
                link: "city/kamchatka/index_en.html",
                img: "img/main_page/cards/kamchatka.jpg"
            },
            {
                title: "Sakhalin Region",
                link: "city/sahalin/index_en.html",
                img: "img/main_page/cards/sahalin.jpg"
            },
            {
                title: "Altai Republic",
                link: "city/altai/index_en.html",
                img: "img/main_page/cards/altai.jpg"
            },
            {
                title: "Murmansk Region",
                link: "city/murmansk/index_en.html",
                img: "img/main_page/cards/murmansk.jpg"
            },
            {
                title: "Irkutsk Region",
                link: "city/irkutsk/index_en.html",
                img: "img/main_page/cards/ircutsk.jpg"
            },
            {
                title: "Republic of Tatarstan",
                link: "city/tatarstan/index_en.html",
                img: "img/main_page/cards/tatarstan.jpg"
            },
            {
                title: "Stavropol Region",
                link: "city/stavropol/index_en.html",
                img: "img/main_page/cards/stavropol.jpg"
            },
            {
                title: "Samara Region",
                link: "city/samara/index_en.html",
                img: "img/main_page/cards/samara.jpg"
            }

        ],
        cities: [

            {
                title: "Moscow",
                link: "city/moscow/index_en.html",
                img: "img/main_page/cards/moskow.jpg"
            },
            {
                title: "Saint Petersburg",
                link: "city/stpetersburg/index_en.html",
                img: "img/main_page/cards/petersburg.jpg"
            },
            {
                title: "Sochi",
                link: "city/sochi/index_en.html",
                img: "img/main_page/cards/sochi.jpg"
            }
        ]
    },

    zh: {
        introTitle: "俄罗斯城市旅行指南",
        introSubtitle: "邂逅这片神奇大地",
        introText: "探索俄罗斯各地区交织如画的文化瑰宝与自然奇观。我们为您精心规划了贯穿核心城市与地区的完整旅程路线，是您理想假期的完美之选。每个目的地均附有详尽介绍，助您轻松规划属于自己的旅行。",
        regionsTitle: "地區",
        citiesTitle: "城市",
        buttonText: "探索更多 →",
        regions: [{
                title: "莫斯科州",
                link: "city/moscow_region/index_zh.html",
                img: "img/main_page/cards/Mos_obl_card.jpg"
            },
            {
                title: "列宁格勒州",
                link: "city/leningragskaya_oblast/index_zh.html",
                img: "img/main_page/cards/Len_obl_card.jpg"
            },
            {
                title: "克拉斯诺达尔边疆区",
                link: "city/krasnodarskii_krai/index_zh.html",
                img: "img/main_page/cards/Kras_kray_card.jpg"
            },
            {
                title: "加里宁格勒州",
                link: "city/kalinigradskaya_oblast/index_zh.html",
                img: "img/main_page/cards/Kalin_obl_card.jpg"
            },
            {
                title: "克拉斯诺亚尔斯克边疆区",
                link: "city/krasnoyarsk/index_zh.html",
                img: "img/main_page/cards/krasnoyarsk.jpg"
            },
            {
                title: "滨海边疆区",
                link: "city/primorsk/index_zh.html",
                img: "img/main_page/cards/primorsk.jpg"
            },
            {
                title: "堪察加边疆区",
                link: "city/kamchatka/index_zh.html",
                img: "img/main_page/cards/kamchatka.jpg"
            },
            {
                title: "萨哈林州",
                link: "city/sahalin/index_zh.html",
                img: "img/main_page/cards/sahalin.jpg"
            },
            {
                title: "阿尔泰共和国",
                link: "city/altai/index_zh.html",
                img: "img/main_page/cards/altai.jpg"
            },
            {
                title: "摩尔曼斯克州",
                link: "city/murmansk/index_zh.html",
                img: "img/main_page/cards/murmansk.jpg"
            },
            {
                title: "伊尔库茨克州",
                link: "city/irkutsk/index_zh.html",
                img: "img/main_page/cards/ircutsk.jpg"
            },
            {
                title: "鞑靼斯坦共和国",
                link: "city/tatarstan/index_zh.html",
                img: "img/main_page/cards/tatarstan.jpg"
            },
            {
                title: "斯塔夫罗波尔边疆区",
                link: "city/stavropol/index_zh.html",
                img: "img/main_page/cards/stavropol.jpg"
            },
            {
                title: "萨马拉州",
                link: "city/samara/index_zh.html",
                img: "img/main_page/cards/samara.jpg"
            }
        ],
        cities: [

            {
                title: "莫斯科",
                link: "city/moscow/index_zh.html",
                img: "img/main_page/cards/moskow.jpg"
            },
            {
                title: "圣彼得堡",
                link: "city/stpetersburg/index_zh.html",
                img: "img/main_page/cards/petersburg.jpg"
            },
            {
                title: "索契",
                link: "city/sochi/index_zh.html",
                img: "img/main_page/cards/sochi.jpg"
            }
        ]
    }
};