export default [
  {
    name: 'chart',
    icon: ['fal', 'chart-bar'],
    title: '图表',
    groups: [
      {
        name: 'line-chart',
        title: '折线图',
        components: [
          {
            name: 'general-line-chart',
            title: '折线图',
            icon: '/assets/general-line-chart.png',
          },
          {
            name: 'double-y-line-chart',
            title: '双Y轴折线图',
            icon: '/assets/double-y-line-chart.png',
          },
          {
            name: 'stack-line-chart',
            title: '区域堆积图',
            icon: '/assets/stack-line-chart.png',
          },
          {
            name: 'dot-line-chart',
            title: '标点折线图',
            icon: '/assets/dot-line-chart.png',
          },
          {
            name: 'line-bar-chart',
            title: '线柱图',
            icon: '/assets/line-bar-chart.png',
          },
        ],
      },
      {
        name: 'bar-chart',
        title: '柱状图',
        components: [
          {
            name: 'GeneralBarChart',
            title: '柱状图',
            icon: '/assets/general-bar-chart.png',
          },
          {
            name: 'FlipBarChart',
            title: '横向柱状图',
            icon: '/assets/flip-bar-chart.png',
          },
          {
            name: 'MultiBarChart',
            title: '多系列柱状图',
            icon: '/assets/multi-bar-chart.png',
          },
          {
            name: 'StackBarChart',
            title: '堆积柱状图',
            icon: '/assets/stack-bar-chart.png',
          },
          {
            name: 'NegativeBarChart',
            title: '正负柱状图',
            icon: '/assets/negative-bar-chart.png',
          },
          {
            name: 'ContrastBarChart',
            title: '对比柱状图',
            icon: '/assets/contrast-bar-chart.png',
          },
          {
            name: 'PolarBarChart',
            title: '极坐标柱状图',
            icon: '/assets/polar-bar-chart.png',
          },
        ],
      },{
        name: 'pie-chart',
        title: '饼图',
        components: [{
          name: 'GeneralPieChart',
          title: '一般饼图'
        },{
          name: 'RingPieChart',
          title: '环状饼图'
        }]
      }
    ],
  },
  {
    name: 'advance-chart',
    title: '高级',
    icon: ['fal', 'stars'],
  },
  {
    name: 'table',
    title: '表格',
    icon: ['fal', 'table'],
  },
  {
    name: 'index',
    title: '指标',
    icon: ['fal', 'bullseye-pointer'],
  },
  {
    name: 'map',
    title: '地图',
    icon: ['fal', 'map-marked'],
  },
  {
    name: 'text',
    title: '文字',
    icon: ['fal', 'text'],
    groups: [
      {
        name: 'static-text',
        title: '静态文本',
        components: [
          {
            name: 'GeneralText',
            title: '一般文本',
            icon: '/assets/general-text.png',
          },
          {
            name: 'LinkText',
            title: '超链接',
            icon: '/assets/link-text.png',
          },
          {
            name: 'CurrentTime',
            title: '当前时间',
            icon: '/assets/current-text.png',
          },
        ],
      },
    ],
  },
  {
    name: 'media',
    title: '媒体',
    icon: ['fal', 'images'],
  },
  {
    name: 'control',
    title: '控件',
    icon: ['fal', 'th-large'],
  },
];
