import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import csvParse from 'csv-parse';
import { message } from 'antd';
import { useEditor, useNode } from '@craftjs/core';

const defaultOption = {
  title: { show: false, left: 'center' },
  xAxis: {
    type: 'category',
  },
  yAxis: {
    type: 'value',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [],
};

export const GeneralBarChart = ({
  data,
  title,
  bound,
  legend,
  chartMargin,
  series,
}: any) => {
  const [option, setOption] = useState(defaultOption);
  const [dataset, setDataset] = useState([]);

  const {
    connectors: { connect, drag },
    setProp,
  } = useNode();
  const { enabled } = useEditor(state => ({
    enabled: state.options.enabled,
  }));

  useEffect(() => {
    if (data.sourceType === 'json') {
      setDataset(JSON.parse(data.source));
    } else if (data.sourceType === 'csv') {
      csvParse({ delimiter: data.sperator }, (err, records) => {
        if (err) {
          message.error(err);
          return;
        }
        setDataset(records);
      });
    } else {
    }
  }, [data]);

  useEffect(() => {
    setOption(o => ({
      ...o,
      dataset: { source: dataset },
    }));
  }, [dataset]);
  useEffect(() => {
    setOption(o => ({
      ...o,
      legend: legend.show
        ? {
            orient: legend.orient,
            left: legend.position.split('-')[1],
            top: legend.position.split('-')[0],
          }
        : undefined,
    }));
  }, [legend]);
  useEffect(() => {
    setOption(o => ({
      ...o,
      series: series.map(x => ({
        type: 'bar',
        name: x.name,
        color: x.color,
        showBackground: x.showBackground,
        backgroundStyle: { color: x.backgroundColor },
      })),
    }));
  }, [series]);

  useEffect(() => {
    setOption(o => ({
      ...o,
      title: { ...o.title, show: !!title, text: title },
    }));
  }, [title]);

  useEffect(() => {
    setOption(o => ({
      ...o,
      grid: chartMargin,
    }));
  }, [chartMargin]);
  return (
    <div
      style={{
        left: bound.x,
        top: bound.y,
        width: bound.width,
        height: bound.height,
        position: 'absolute',
        zIndex: 10,
      }}
      ref={dom => dom && connect(drag(dom))}
    >
      <ReactECharts
        option={option}
        notMerge
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

GeneralBarChart.craft = {
  displayName: '一般柱图',
  defaultProps: {
    title: '一般柱图',
    bound: {
      x: '0px',
      y: '0px',
      width: '300px',
      height: '200px',
    },
    data: {
      sourceType: 'json',
      source:
        `[
        ["Mon", 120, 200],
        ["Tue", 200, 120],
        ["Wed", 150, 60],
        ["Thu", 80, 90],
        ["Fri", 70, 130],
        ["Sat", 110, 100],
        ["Sun", 130, 40]` + `\n]`,
    },
    series: [{ name: '系列1' }, { name: '系列2' }],
    chartMargin: {
      top: '40',
      bottom: '20',
      left: '40',
      right: '10',
    },
    legend: {
      orient: 'horizontal',
      show: true,
      position: 'top-right',
    },
  },
  custom: {
    settings: {
      basic: [
        {
          name: 'title',
          label: '标题',
          controlType: 'input',
        },
        {
          name: 'bound',
          label: '尺寸 & 位置',
          controlType: 'bound',
        },
        {
          name: 'series',
          label: '系列',
          controlType: 'series',
        },
        {
          name: 'chartMargin',
          label: '主图边距',
          controlType: 'margin',
        },
        {
          name: 'legend',
          label: '图例',
          controlType: 'legend',
        },
      ],
      data: [
        {
          name: 'data',
          label: '数据',
          controlType: 'dataSource',
        },
      ],
    },
  },
};
