module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            ['@babel/plugin-proposal-export-namespace-from'],
            [
                'module-resolver',
                {
                    alias: {
                        '@components': './src/components/index.ts',
                        '@constants': './src/constants/index.ts',
                        '@contexts': './src/contexts/index.ts',
                        '@hooks': './src/hooks/index.ts',
                        '@navigations': './src/navigations/index.ts',
                        '@screens': './src/screens/index.ts',
                        '@types': './src/types/index.ts',
                        '@utils': './src/utils/index.ts',
                    },
                },
            ],
            'nativewind/babel',
        ],
    };
};
