# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request

LEVEL_BADGES = {
    'specialist': 'simbioz-badge--sky',
    'manager': 'simbioz-badge--orange',
    'top': 'simbioz-badge--purple',
}


class SimbiozAcademyTheme(http.Controller):

    @http.route('/simbioz_academy/courses', type='json', auth='public', website=True)
    def courses(self, level=None):
        domain = [('is_published', '=', True)]
        if level:
            domain.append(('level', '=', level))
        records = request.env['simbioz.course'].sudo().search(domain)
        level_labels = dict(records._fields['level']._description_selection(request.env))
        return [{
            'id': course.id,
            'name': course.name,
            'description': course.description or '',
            'level': course.level,
            'level_label': level_labels.get(course.level, ''),
            'badge_class': LEVEL_BADGES.get(course.level, 'simbioz-badge--sky'),
            'practice_platform': course.practice_platform or '',
            'duration': course.duration or '',
            'price': course.price or '',
        } for course in records]
