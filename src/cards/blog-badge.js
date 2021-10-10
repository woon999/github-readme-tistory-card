const { letterSpacing, getBadgeColor, badgeStyle } = require('../common/utils');

const createBadge = async (name, theme) => {
    var size = 19;
    if (name === undefined) name = 'insert name';
    size += letterSpacing(name);
    if (name.length > 5) {
        size += name.length * 0.5;
    }

    const { titleColor, iconColor, bgColor } = getBadgeColor(theme);

    return (`
        <svg xmlns="http://www.w3.org/2000/svg" width="130" height="25" viewBox="0 0 130 25" fill="none">
        
        ${badgeStyle(titleColor, iconColor, bgColor)}
        <svg xmlns="http://www.w3.org/2000/svg" width="130" height="25" viewBox="0 0 130 25" fill="none">
            <g>
                <rect x="22" width="${size}" height="25" class="bg"/>
                <text x="30" y="17" class="title">${name}</text>
            </g>
            <path d="M3.125 0H21.875C23.6009 0 25 1.39911 25 3.125V21.875C25 23.6009 23.6009 25 21.875 25H3.125C1.39911 25 0 23.6009 0 21.875V3.125C0 1.39911 1.39911 0 3.125 0Z" class="icon-bg"/>
            
            <g width="25" height="25" class="icon">
                <circle class="cls-1" cx="7" cy="8" r="2" />
                <circle class="cls-1" cx="12" cy="8" r="2" />
                <circle class="cls-1" cx="17" cy="8" r="2" />
                <circle class="cls-1" cx="12" cy="13" r="2"/>
                <circle class="cls-1" cx="12" cy="18" r="2"/>
            </g>
        </svg>
    </svg>
    `);
}

module.exports = createBadge;