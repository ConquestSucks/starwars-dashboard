import { COLOR_KEYS_CSS } from "@/constants";

const horizontalStackChartOptions = {
  indexAxis: 'y',
  maintainAspectRatio: false,
  animation: false,
  plugins: {
    datalabels: { display: true },
    legend: {
      display: false
    },
    tooltip: {
      intersect: true,
      backgroundColor: COLOR_KEYS_CSS["white"],
      cornerRadius: 12,
      titleAlign: 'center',
      titleColor: COLOR_KEYS_CSS["gray-600"],
      titleFont: {
        size: 14,
        weight: 400,
      },
      titleMarginBottom: 4,
      bodyColor: COLOR_KEYS_CSS["black"],
      bodyFont: {
        size: 16,
        weight: 400,
      },
      boxWidth: 8,
      boxHeight: 8,
      boxPadding: 4,
      usePointStyle: true,
      pointStyle: 'circle',
      callbacks: {
        label: function (context: { dataset: { label: string; counts: { [x: string]: unknown; }; }; formattedValue: unknown; dataIndex: string | number; }) {
          const label = context.dataset.label || '';
          const percentage = context.formattedValue;
          const count = context.dataset.counts[context.dataIndex];
          return `${label} ${count} (${percentage}%)`;
        },
      }
    }
  },

  scales: {
    y: { stacked: true, display: false, },
    x: { stacked: true, display: false }
  },
  elements: {
    bar: {
      borderSkipped: false,
      borderWidth: 1,
      borderColor: 'transparent',
      borderRadius: { topLeft: 8, topRight: 8, bottomLeft: 8, bottomRight: 8 },
    }
  }
}

const horizontalChartOptions = {
  indexAxis: 'y',
  maintainAspectRatio: false,
  animation: false,
  offset: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: false
  },
  layout: {
    padding: {
      right: 25
    }
  },
  scales: {
    x: {
      beginAtZero: true,
      display: true,
      border: {
        display: false
      },
      grid: {
        display: true,
        drawOnChartArea: true,
        drawBorder: false,
      },
      ticks: {
        stepSize: 1,
        precision: 0,
        font: {
          family: "MuseoSansCyrl",
          size: 14,
          weight: 400
        }
      },
    },
    y: {
      beginAtZero: true,
      display: true,
      grid: {
        display: false,
      },
      ticks: {
        maxWidth: 189,
        color: COLOR_KEYS_CSS["black"],
        font: {
          family: "MuseoSansCyrl",
          size: 14,
          weight: 400
        }
      }
    }
  },
  elements: {
    bar: {
      borderSkipped: false,
      borderWidth: 1,
      borderColor: 'transparent',
      borderRadius: 16,
    }
  }
}

export { horizontalStackChartOptions, horizontalChartOptions }
