# -*- coding: utf-8 -*-
from odoo import fields, models

LEVELS = [
    ('specialist', 'Спеціаліст'),
    ('manager', 'Керівник'),
    ('top', 'ТОП-менеджер'),
]


class SimbiozCourse(models.Model):
    _name = 'simbioz.course'
    _description = 'Навчальний курс Simbioz Academy'
    _order = 'sequence, id'

    name = fields.Char('Назва курсу', required=True, translate=True)
    sequence = fields.Integer('Послідовність', default=10)
    level = fields.Selection(LEVELS, string='Рівень', required=True, default='specialist')
    description = fields.Text('Опис', translate=True)
    practice_platform = fields.Char(
        'Платформа практики', default='Simbioz EMS', translate=True,
        help='Наприклад: Simbioz EMS, Simbioz FAMS, Simbioz PMS')
    duration = fields.Char('Тривалість', translate=True, help='Наприклад: 3 місяці')
    price = fields.Char('Вартість', translate=True, help='Залиште порожнім, щоб не показувати')
    is_published = fields.Boolean('Опубліковано на сайті', default=True)
