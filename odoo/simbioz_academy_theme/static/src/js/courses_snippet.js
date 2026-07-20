/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";
import { jsonrpc } from "@web/core/network/rpc_service";

publicWidget.registry.SimbiozCourses = publicWidget.Widget.extend({
    selector: ".s_simbioz_courses",
    disabledInEditableMode: false,

    async start() {
        await this._renderCourses();
        return this._super(...arguments);
    },

    async _renderCourses() {
        const grid = this.el.querySelector(".simbioz-courses-grid");
        if (!grid) {
            return;
        }
        let courses = [];
        try {
            courses = await jsonrpc("/simbioz_academy/courses", {});
        } catch {
            grid.innerHTML = "";
            return;
        }
        grid.innerHTML = "";
        if (!courses.length) {
            const empty = document.createElement("p");
            empty.className = "text-muted";
            empty.textContent = "Курси ще не опубліковано.";
            grid.appendChild(empty);
            return;
        }
        for (const course of courses) {
            grid.appendChild(this._buildCard(course));
        }
    },

    _buildCard(course) {
        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-4";

        const card = document.createElement("div");
        card.className = "simbioz-card simbioz-course-card";

        const head = document.createElement("div");
        head.className = "simbioz-course-head";
        const title = document.createElement("h3");
        title.className = "simbioz-card-title mb-0";
        title.textContent = course.name;
        const badge = document.createElement("span");
        badge.className = `simbioz-badge ${course.badge_class}`;
        badge.textContent = course.level_label;
        head.append(title, badge);

        const desc = document.createElement("p");
        desc.textContent = course.description;

        const meta = document.createElement("div");
        meta.className = "simbioz-course-meta";
        for (const text of [
            course.practice_platform && `Практика на ${course.practice_platform}`,
            course.duration,
            course.price,
        ]) {
            if (text) {
                const tag = document.createElement("span");
                tag.className = "simbioz-badge simbioz-badge--cream";
                tag.textContent = text;
                meta.appendChild(tag);
            }
        }

        const actions = document.createElement("div");
        const link = document.createElement("a");
        link.className = "btn simbioz-btn-primary";
        link.href = "/contactus";
        link.textContent = "Записатись на курс";
        actions.appendChild(link);

        card.append(head, desc, meta, actions);
        col.appendChild(card);
        return col;
    },
});

export default publicWidget.registry.SimbiozCourses;
