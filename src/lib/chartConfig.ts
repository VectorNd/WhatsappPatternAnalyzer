export const timelineOptions = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Number of Messages'
      }
    },
    x: {
      title: {
        display: true,
        text: 'Date'
      }
    }
  }
};

export const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const
    }
  }
}

export const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
}

const commonChartOptions = {
  plugins: {
    legend: {
      labels: {
        color: 'rgb(255, 255, 255, 0.9)',
        font: {
          family: 'var(--font-geist-sans)'
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.7)'
      }
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.7)'
      }
    }
  }
} 