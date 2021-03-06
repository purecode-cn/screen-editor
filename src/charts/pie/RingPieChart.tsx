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
    top: '5%',
    left: 'center',
  },
  series: [],
};

export const RingPieChart = ({
  data,
  title,
  bound,
  legend,
  seriesName,
  radius,
  outsideRadius,
  emphasisFont,
  labelLine,
  chartMargin

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
          radius: [radius, outsideRadius],
          avoidLabelOverlap: false,
          emphasis: {
            label: {
              show: true,
              color: emphasisFont && emphasisFont.textColor || 'black',
              fontSize: emphasisFont && emphasisFont.fontSize || 30,
              //fontWeight: emphasisFont.fontWeight
            }
          },
          ...chartMargin,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: labelLine
          },
        },
      ],
    }));
  }, [seriesName,
    radius,
    outsideRadius,
    emphasisFont,
    chartMargin,
    labelLine]);

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

RingPieChart.craft = {
  displayName: '????????????',
  defaultProps: {
    title: '????????????',
    bound: {
      x: '0px',
      y: '0px',
      width: '400px',
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
    outsideRadius: '100%',
    seriesName: '??????',
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
    },
  },
  custom: {
    settings: {
      basic: [
        {
          name: 'title',
          label: '??????',
          controlType: 'input',
        },
        {
          name: 'seriesName',
          label: '????????????',
          controlType: 'input',
        },
        {
          name: 'bound',
          label: '?????? & ??????',
          controlType: 'bound',
        },
        {
          name: 'radius',
          label: '????????????',
          controlType: 'numberUnit',
        },
        {
          name: 'outsideRadius',
          label: '????????????',
          controlType: 'numberUnit',
        },
        {
          name: 'emphasisFont',
          label: '??????',
          controlType: 'font',
        },
        {
          name: 'chartMargin',
          label: '????????????',
          controlType: 'margin',
        },
        {
          name: 'legend',
          label: '??????',
          controlType: 'legend',
        },
      ],
      data: [
        {
          name: 'data',
          label: '??????',
          controlType: 'dataSource',
        },
      ],
    },
  },
};
