import Layout from "../components/layout/Layout";
import {MantineProvider, ColorSchemeProvider} from "@mantine/core";
import {useColorScheme} from "@mantine/hooks";
import {useState} from "react";
import {getCookie, setCookies} from "cookies-next";


export default function MyApp(props) {
    const {Component, pageProps} = props;
    const preferredColorScheme = useColorScheme();
    const [colorScheme, setColorScheme ] = useState(props.colorScheme);

    const toggleColorScheme = (value) => {
    const nextColorScheme = value || (colorScheme === "dark" ? 'light' : "dark" );
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, {maxAge: 60*60*24*30});

}

    return (
        <Layout>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider theme={{colorScheme}} withGlobalStyles withNormalizeCSS>
                    <Component {...pageProps} />
                </MantineProvider>
            </ColorSchemeProvider>
        </Layout>
);
}

MyApp.getInitialProps = ({ctx}) => ({
    colorScheme: getCookie('mantine-color-scheme', ctx) || 'n ',
})