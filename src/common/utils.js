const { postCardTheme, badgeTheme } = require("../themes");

const letterSpacing = (text) => {
    const number = /[0-9]/;
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const capEnglish = /[A-Z]/;

    let len = 0;
    for (let i = 0; i < text.length; i++) {
        const letter = text[i];

        if (number.test(letter)) {
            len += 6;
        } else if (korean.test(letter)) {
            len += 11.2;
        } else if (capEnglish.test(letter)) {
            len += 6.2;
        } else {
            len += 5.2;
        }
    }

    return len;
}

const getTagSVG = (tags) => {
    if (tags === undefined) return;
    let tagSVG = '';
    let xPos = 25;

    tags.forEach((tag) => {
        let size = 16;
        size += letterSpacing(tag);

        if (xPos + size < 430) {
            tagSVG += `
                <svg data-testid="lang-items" x="${xPos}" width="${size}" viewBox="0 0 ${size} 19">
                    <g style="position: relative;">
                        <rect width="${size}" height="19.5367" rx="9.76834" class="tag-bg"/>
                        <text data-testid="lang-name" text-anchor="middle" x="${size / 2
                }" y="14" class="tag-item">${tag}</text>
                    </g>
                </svg>
                ,
            `;
        }
        xPos += size + 5;

    });

    return tagSVG;
};

const getBadgeColor = (theme, basic = "default") => {
    const defaultTheme = badgeTheme[basic];
    const selectedTheme = badgeTheme[theme] || defaultTheme;

    const titleColor = "#" + selectedTheme.title_color;
    const iconColor = "#" + selectedTheme.icon_color;
    const bgColor = "#" + selectedTheme.bg_color;

    return { titleColor, iconColor, bgColor };
}

const badgeStyle = (titleColor, iconColor, bgColor) => {
    return `
        <style>
            .title{ fill: ${titleColor}; font-weight: 500; font-size: 13px;}
            .icon { fill: ${iconColor}; }
            .icon-bg { fill: ${bgColor};  }
            .bg { fill: ${bgColor}; }
        </style>
    `
}

const getCardColor = (theme, basic = "default") => {
    const defaultTheme = postCardTheme[basic];
    const selectedTheme = postCardTheme[theme] || defaultTheme;
    const defaultBorderColor = selectedTheme.border_color || defaultTheme.border_color;

    const titleColor = "#" + selectedTheme.title_color;
    const iconColor = "#" + selectedTheme.icon_color;
    const textColor = "#" + selectedTheme.text_color;
    const tagColor = "#" + selectedTheme.tag_color;
    const tagBgColor = "#" + selectedTheme.tag_bg_color;
    const bgColor = "#" + selectedTheme.bg_color;
    const borderColor = "#" + defaultBorderColor;

    return { titleColor, textColor, iconColor, tagColor, tagBgColor, bgColor, borderColor };
}

const cardStyle = (titleColor, textColor, iconColor, tagColor, tagBgColor, bgColor, borderColor) => {
    return `
        <style xmlns="http://www.w3.org/2000/svg">
    .header {
        font: bold 14px 'Segoe UI', Ubuntu, Sans-Serif;
        fill: ${titleColor};
        animation: fadeInAnimation 0.8s ease-in-out forwards;
    }
    .card-wrapper {
        fill: ${bgColor};
        stroke: ${borderColor};
    }
    .post-title {
        font: bold 15.5px 'Segoe UI', Ubuntu, Sans-Serif;
        fill: ${textColor};
    }
    .tag-bg{
        fill: ${tagBgColor};
    }
    .tag-item {
        font-size: 12px;
        fill: ${tagColor};
    }
    .comment-count {
        font-size: 12px;
        fill: ${iconColor};
    }    
    .comment-icon {
        fill: ${iconColor}
    }
    .new{
        font: bold 15px 'Segoe UI', Ubuntu, Sans-Serif;
        fill: ${titleColor};
    }
    </style>
        `;
};

module.exports = {
    letterSpacing,
    getTagSVG,
    getBadgeColor,
    badgeStyle,
    getCardColor,
    cardStyle,
}