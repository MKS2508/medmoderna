import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="UTF-8" />
                    <meta name="description" content="Tienda online especializada en todo lo relacionado con el CBD y el cultivo de Cannabis, asi como parafernalia, iluminacion y todo lo relacionado con tu cultivo. Estamos ubicados en Logro;o" />
                    <meta name="keywords" content="Medicina Moderna, Grow Shop, Tienda Online, Grow Shop Online, Logroño, medicinamodernagrow.shop, CBD, Cannabis, Cultivo, Parafernalia, Ropa, RAW, Tienda especializada RAW, Distribuidor Oficial Raw, Mejor Grow Shop Online, Mejor tienda online" />
                    <link rel="icon" type="image/svg+xml" href="../assets/logo.png" />

                    {/* This allows the site to be used offline as a PWA
                    <link rel="manifest" href="/manifest.json" />
                    */}

                    {/* This sets the color of url bar in Chrome mobile */}
                    <meta name="theme-color" content="green" />

                    {/* This helps Google to better index your site */}
                    <meta name="google" content="nositelinkssearchbox" />
                    <meta name="google" content="notranslate" />
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
                {
                    /*

        __  ___    ______    ____     ____   ______    ____    _   __    ___            __  ___   ____     ____     ______    ____     _   __    ___
       /  |/  /   / ____/   / __ \   /  _/  / ____/   /  _/   / | / /   /   |          /  |/  /  / __ \   / __ \   / ____/   / __ \   / | / /   /   |
      / /|_/ /   / __/     / / / /   / /   / /        / /    /  |/ /   / /| |         / /|_/ /  / / / /  / / / /  / __/     / /_/ /  /  |/ /   / /| |
     / /  / /   / /___    / /_/ /  _/ /   / /___    _/ /    / /|  /   / ___ |        / /  / /  / /_/ /  / /_/ /  / /___    / _, _/  / /|  /   / ___ |
    /_/  /_/   /_____/   /_____/  /___/   \____/   /___/   /_/ |_/   /_/  |_|       /_/  /_/   \____/  /_____/  /_____/   /_/ |_|  /_/ |_/   /_/  |_|

                                                 ______    ____    ____  _       __   _____    __  __   ____     ____
                                                / ____/   / __ \  / __ \| |     / /  / ___/   / / / /  / __ \   / __ \
                                               / / __    / /_/ / / / / /| | /| / /   \__ \   / /_/ /  / / / /  / /_/ /
                                              / /_/ /   / _, _/ / /_/ / | |/ |/ /   ___/ /  / __  /  / /_/ /  / ____/
                                              \____/   /_/ |_|  \____/  |__/|__/   /____/  /_/ /_/   \____/  /_/


     @MarcosAsensio9
    */
                }
            </Html>
        )
    }
}

export default MyDocument
