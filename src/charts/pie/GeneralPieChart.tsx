import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import csvParse from 'csv-parse';
import { message } from 'antd';
import { useEditor, useNode } from '@craftjs/core';

const defaultOption = {
  title: {
    show: false,
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [],
};

export const GeneralPieChart = ({
  data,
  title,
  bound,
  legend,
  seriesName,
  radius,
  chartMargin,
}: any) => {
  const [option, setOption] = useState<any>(defaultOption);
  const [dataset, setDataset] = useState([]);

  const {
    connectors: { connect, drag },
    setProp,
  } = useNode();
  const { enabled } = useEditor(state => ({ enabled: state.options.enabled }));

  useEffect(() => {
    if (data.sourceType === 'json') {
      setDataset(JSON.parse(data.source));
    } else if (data.sourceType === 'csv') {
      csvParse(
        {
          delimiter: data.sperator,
        },
        (err, records) => {
          if (err) {
            message.error(err);
            return;
          }
          setDataset(records);
        }
      );
    } else {
    }
  }, [data]);

  useEffect(() => {
    setOption(o => ({
      ...o,
      dataset: {
        source: dataset,
      },
    }));
  }, [dataset]);

  useEffect(() => {
    setOption(o => ({
      ...o,
      series: [
        {
          type: 'pie',
          name: seriesName,
          radius: radius,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          ...chartMargin,
        },
      ],
    }));
  }, [seriesName, radius, chartMargin]);

  useEffect(() => {
    setOption(o => ({
      ...o,
      title: {
        ...o.title,
        show: !!title,
        text: title,
      },
    }));
  }, [title]);

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

GeneralPieChart.craft = {
  displayName: '一般饼图',
  defaultProps: {
    title: '一般饼图',
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
    radius: '50%',
    seriesName: '系列',
    legend: {
      orient: 'vertical',
      show: true,
      position: 'top-left',
    },

    chartMargin: {
      top: '40px',
      bottom: '20px',
      left: '40px',
      right: '10px',
    }
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
          name: 'seriesName',
          label: '系列名称',
          controlType: 'input',
        },
        {
          name: 'bound',
          label: '尺寸 & 位置',
          controlType: 'bound',
        },
        {
          name: 'radius',
          label: '半径',
          controlType: 'numberUnit',
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
