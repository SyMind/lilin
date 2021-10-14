export default {
    pages: ['pages/index/index'],
    subpackages: [
        {
            root: 'base',
            pages: [
                'pages/cell/index',
                'pages/icon/index',
                'pages/price/index',
                'pages/button/index',
                'pages/avatar/index'
                // 'pages/popup/index',
                // 'pages/overlay/index'
            ]
        }
    ],
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
    }
};
