import {createTheme, PaletteColor, PaletteColorOptions} from '@mui/material/styles';

declare module '@mui/material/styles'{
    interface Palette{
        cgv:PaletteColor;
        cinepolis:PaletteColor;
        links:PaletteColor;
        lightgrey:PaletteColor;
        shade600:PaletteColor;
        royalblue:PaletteColor;
    }
    interface PaletteOptions{
        cgv?: PaletteColorOptions;
        cinepolis?:PaletteColorOptions;
        links?:PaletteColorOptions;
        lightgrey?:PaletteColorOptions;
        shade600?:PaletteColorOptions;
        royalblue?:PaletteColorOptions;
    }

    interface Theme{
        customGradients:{
            primary:string;
        };
    }

    interface ThemeOptions{
        customGradients?:{
            primary?:string;
        }
    }
}

const theme = createTheme({

    customGradients:{
        primary:'linear-gradient(to right,rgba(242, 196, 111, 1),rgba(198, 148, 63, 1))',
    },
    palette:{
        primary:{
            main: '#FFFFFF',
        },
        secondary:{
            main:'rgba(51, 51, 51, 1)'
        },
        cgv:{
            main:'rgba(236, 30, 43, 1)'
        },
        cinepolis:{
            main:'rgba(0, 14, 98, 1)'
        },
        links:{
            main:'rgba(17, 142, 234, 1)'
        },
        lightgrey:{
            main:'rgba(51, 61, 88, 1)'
        },
        royalblue:{
            main:'rgba(26, 44, 80, 1)'
        },

    },
    breakpoints:{
        values:{
            xs:0,
            sm:770,
            md:971,
            lg:1150,
            xl:1400
        }
    },
    typography: {
        h1: {
          fontSize: "32px",
        },
        h2: {
          fontSize: "28px",
          fontWeight:'bold'
        },
        h3: {
          fontSize: "24px",
          fontWeight:'bold'
        },
        h4: {
          fontSize: "18px",
          fontWeight:'bold'
        },
        body1: {
          fontSize: "16px", 
        },
        body2: {
          fontSize: "16px", 
        },
      },
})

export default theme;