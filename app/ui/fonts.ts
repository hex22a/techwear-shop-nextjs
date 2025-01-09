import localFont from 'next/font/local'

export const satoshi = localFont({
    variable: '--font-satoshi',
    src: [
        {
            path: './local_fonts/Satoshi_Complete/Satoshi-Regular.woff2',
            style: 'normal',
            weight: '400',
        },
        {
            path: './local_fonts/Satoshi_Complete/Satoshi-Bold.woff2',
            style: 'normal',
            weight: '700',
        },
        {
            path: './local_fonts/Satoshi_Complete/Satoshi-Black.woff2',
            style: 'normal',
            weight: '900',
        },
        {
            path: './local_fonts/Satoshi_Complete/Satoshi-BlackItalic.woff2',
            style: 'italic',
            weight: '900',
        },
        {
            path: './local_fonts/Satoshi_Complete/Satoshi-Light.woff2',
            style: 'normal',
            weight: '300',
        },
        {
            path: './local_fonts/Satoshi_Complete/Satoshi-LightItalic.woff2',
            style: 'italic',
            weight: '300',
        },
        {
            path: './local_fonts/Satoshi_Complete/Satoshi-Medium.woff2',
            style: 'normal',
            weight: '500',
        },
        {
            path: './local_fonts/Satoshi_Complete/Satoshi-MediumItalic.woff2',
            style: 'italic',
            weight: '500',
        },
        {
            path: './local_fonts/Satoshi_Complete/Satoshi-BoldItalic.woff2',
            style: 'italic',
            weight: '600',
        },
    ]
})
export const integral = localFont({
    variable: '--font-integral',
    src: [
        {
            path: './local_fonts/Integral_CF/integralcf-regular.otf',
            style: 'normal',
            weight: '400',
        },
        {
            path: './local_fonts/Integral_CF/integralcf-bold.otf',
            style: 'normal',
            weight: '700',
        },
        {
            path: './local_fonts/Integral_CF/integralcf-medium.otf',
            style: 'normal',
            weight: '500',
        }
    ]
})
