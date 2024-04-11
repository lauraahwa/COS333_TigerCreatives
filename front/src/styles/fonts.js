import { css } from 'styled-components'

import PoppinsBold from '@/assets/fonts/Poppins-Bold.ttf'
import PoppinsRegular from '@/assets/fonts/Poppins-Regular.ttf'
import PoppinsSemiBold from '@/assets/fonts/Poppins-SemiBold.ttf'
import PoppinsMedium from '@/assets/fonts/Poppins-Medium.ttf'
import PoppinsItalic from '@/assets/fonts/Poppins-Italic.ttf'

const poppinsNormalWeights = {
    400: PoppinsRegular,
    500: PoppinsMedium,
    600: PoppinsSemiBold,
    700: PoppinsBold,
}

const poppinsItalicWeights = {
    400: PoppinsItalic
}


const poppins = {
    name: 'Poppins',
    normal: poppinsNormalWeights,
    italic: poppinsItalicWeights
}

const createFontFace = (family, style = 'normal') => {
    let styles = ''

    for (const [weight, file] of Object.entries(family[style])) {
        styles += `
            @font-face {
                font-family: '${family.name}';
                src: url(${file}) format('truetype');
                font-weight: ${weight};
                font-style: ${style};
                font-display: swap;
            }
        `
    }

    return styles
}

const poppinsNormal = createFontFace(poppins)
const poppinsItalic = createFontFace(poppins, 'italic')

const fonts = css`
    ${poppinsNormal}
    ${poppinsItalic}
`

export default fonts