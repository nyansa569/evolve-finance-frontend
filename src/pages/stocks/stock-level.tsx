'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useMemo } from 'react'
import { Label, Pie, PieChart } from 'recharts';

const chartData = [
    { browser: "chrome", visitors: 5300, fill: "var(--color-chrome)" },
    { browser: "firefox", visitors: 4150, fill: "var(--color-firefox)" },
    { browser: "safari", visitors: 1050, fill: "var(--color-safari)" },
]

const chartConfig = {
    firefox: {
        label: "Firefox",
        color: "hsla(57, 93%, 44%, 1)",
    },
    chrome: {
        label: "Chrome",
        color: "hsla(121, 100%, 50%, 1)",
    },
    safari: {
        label: "Safari",
        color: "hsla(0, 100%, 50%, 1)",
    },
} satisfies ChartConfig

function StockLevel() {

    const totalVisitors = useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
      }, [])

  return (
    <Card className='w-full bg-[#14323F] border-none'>
        <CardHeader>
            <CardTitle>Stock Level</CardTitle>
        </CardHeader>
        <CardContent className='flex justify-between items-stretch gap-10'>
            <div className='w-[40%]'>
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square min-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                            <Pie
                                data={chartData}
                                dataKey="visitors"
                                nameKey="browser"
                                innerRadius={80}
                                strokeWidth={5}
                            >
                            <Label
                                content={({ viewBox }) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            fill="white"
                                            className="text-3xl font-bold"
                                        >
                                            {totalVisitors.toLocaleString()}
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 24}
                                        className="fill-muted-foreground"
                                        >
                                            TOTAL PRODUCTS
                                        </tspan>
                                    </text>
                                    )
                                }
                                }}
                            />
                            </Pie>
                    </PieChart>
                </ChartContainer>
            </div>
            <div className='flex-1 flex flex-col justify-center gap-8'>
                <div className='w-full space-y-2'>
                    <p className='text-[13px]'>HIGH STOCK</p>
                    <div className='w-full h-1.5 relative bg-gray-200 rounded-md'>
                        <div className='w-[80%] absolute inset-0 bg-[#00FF04] rounded-md'></div>
                    </div>
                </div>
                <div className='w-full space-y-2'>
                    <p className='text-[13px]'>LOW STOCK</p>
                    <div className='w-full h-1.5 relative bg-gray-200 rounded-md'>
                        <div className='w-[50%] absolute inset-0 bg-[#D8CF08] rounded-md'></div>
                    </div>
                </div>
                <div className='w-full space-y-2'>
                    <p className='text-[13px]'>OUT OF STOCK</p>
                    <div className='w-full h-1.5 relative bg-gray-200 rounded-md'>
                        <div className='w-[35%] absolute inset-0 bg-[#FF0000] rounded-md'></div>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default StockLevel