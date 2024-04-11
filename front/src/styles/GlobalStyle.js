import { createGlobalStyle } from "styled-components";
import variables from "./variables";
import fonts from './fonts'

const GlobalStyle = createGlobalStyle`
    ${variables}
    ${fonts}

    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        scroll-behavior: smooth;

        font-family: var(--font-poppins);
    }
`

export default GlobalStyle;