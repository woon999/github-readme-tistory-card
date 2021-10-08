const { cardStyle } = require('../common/utils');
const { getCardColor } = require('../common/utils');
const { getTagSVG } = require('../common/utils');

const createCard = async (
    res, isNew,
    { theme, name, title, comments, tags }
) => {
    const { titleColor, textColor, iconColor, tagColor, tagBgColor, bgColor, borderColor }
        = getCardColor(theme);

    res.send(`
        <svg xmlns="http://www.w3.org/2000/svg" width="425" height="120" viewBox="0 0 450 130" fill="none">
            ${cardStyle(titleColor, textColor, iconColor, tagColor, tagBgColor, bgColor, borderColor)}
            
            <rect xmlns="http://www.w3.org/2000/svg" data-testid="card-bg" x="0.5" y="0.5" rx="4.5" height="99%" width="449" stroke-opacity="1" class="card-wrapper"/>
            <g xmlns="http://www.w3.org/2000/svg" data-testid="card-title" transform="translate(25, 35)">
            <g transform="translate(0, 0)">
                    <text x="0" y="0" class="header" data-testid="header">${name}.tistory.com</text>
                    ${sideIcon(isNew, comments)}
                </g>
            </g>
            <g xmlns="http://www.w3.org/2000/svg" data-testid="main-card-body" transform="translate(0, 45)">
            <svg data-testid="lang-items" x="25" width="400" height="40" viewBox="0 0 400 40">
                <g transform="translate(0, 0)">
                    <text data-testid="lang-name" x="2" y="23" class="post-title">${title}</text>
                </g>
            </svg>
            </g>
            <g xmlns="http://www.w3.org/2000/svg" data-testid="main-card-bottom" transform="translate(0, 36)">
                ${getTagSVG(tags)}
            </g>
        </svg>`);
};


const sideIcon = (isNew, comments) => {
    return (isNew === true) ? `
        <svg xmlns="http://www.w3.org/2000/svg" width="30" x="378" y="-14" height="17" viewBox="0 0 30 17" fill="none">
            <text data-testid="lang-name" x="2" y="15" class="new" font-size:"100px">new</text>
        </svg>
        `
        :

        `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="19" x="380" y="-14" height="17" viewBox="131 -131 512 512" style="enable-background:new 131 -131 512 512;">
        >
            <path d="M643,88.2c0,33.6-11.2,63.4-34.5,92.3c-23.3,28-54.1,50.4-93.3,67.1c-39.2,15.9-82.1,24.2-128.7,24.2 c-13.1,0-27-0.9-42-1.9c-38.2,33.6-82.1,56.9-131.5,69c-9.3,2.8-20.5,4.7-32.6,6.5c-2.8,0-6.5-0.9-8.4-2.8s-4.7-4.7-4.7-8.4l0,0 c-0.9-0.9-0.9-1.9,0-3.7c0.9-1.9,0.9-2.8,0.9-2.8s0-0.9,0.9-2.8l1.9-2.8l1.9-2.8l1.9-2.8c0.9-1.9,4.7-4.7,9.3-10.3 c4.7-4.7,7.5-8.4,10.3-11.2c2.8-2.8,4.7-5.6,9.3-11.2c3.7-5.6,7.5-10.3,9.3-14.9c1.8-4.6,4.7-10.3,7.5-16.8 c2.8-6.5,5.6-14,7.5-21.4c-29.8-16.8-53.2-38.2-70.9-63.4c-17.7-25-26.1-52.1-26.1-80.1c0-25.2,6.5-48.5,20.5-70.9s31.7-42,55-58.8 s50.4-29.8,82.1-39.2c31.7-9.4,65.3-14,99.8-14c46.6,0,89.5,8.4,128.7,24.2S588-33.3,610.4-4.4C631.8,23.8,643,54.6,643,88.2z"
             class="comment-icon"/>
        </svg>
        <text x="365" class="comment-count" data-testid="comment-count">${comments}</text>
        `;
}


module.exports = createCard;