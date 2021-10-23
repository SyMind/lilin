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
                'pages/avatar/index',
                'pages/overlay/index'
            ]
        },
        {
            root: 'layout',
            pages: ['pages/layout/index']
        },
        {
            root: 'feedback',
            pages: [
                'pages/popup/index',
                'pages/swipe/index'
            ]
        },
        {
            root: 'dentry',
            pages: [
                'pages/inputNumber/index'
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
