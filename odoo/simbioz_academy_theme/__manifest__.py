# -*- coding: utf-8 -*-
{
    'name': 'Simbioz Academy Theme',
    'summary': 'Бренд-стиль Simbioz Academy: сніпети Website Builder, модель курсів, дизайн-токени UI-кіту',
    'description': """
Simbioz Academy Theme для Odoo 17
=================================
- Сніпети Website Builder у фірмовому стилі (hero, переваги, кроки, рівні, курси, відгуки, CTA)
- Модель simbioz.course — курси редагуються в бекенді (меню Simbioz Academy)
- Динамічний сніпет «Курси» підтягує опубліковані курси автоматично
- Типографіка Sansation/Montserrat та кольори за SIMBIOZ UI KIT
""",
    'author': 'Simbioz',
    'website': 'https://simbioz.academy',
    'version': '17.0.1.0.0',
    'category': 'Website/Website',
    'license': 'LGPL-3',
    'depends': ['website'],
    'data': [
        'security/ir.model.access.csv',
        'views/course_views.xml',
        'views/snippets.xml',
        'data/courses_data.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'simbioz_academy_theme/static/src/scss/theme.scss',
            'simbioz_academy_theme/static/src/js/courses_snippet.js',
        ],
    },
    'images': ['static/description/icon.png'],
    'application': False,
    'installable': True,
}
