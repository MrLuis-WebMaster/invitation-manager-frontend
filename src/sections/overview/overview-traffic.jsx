import PropTypes from 'prop-types';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import UserMinusIcon from '@heroicons/react/24/solid/UserMinusIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Stack,
    SvgIcon,
    Typography,
    useTheme,
} from '@mui/material';
import { Chart } from 'src/components/chart';

const useChartOptions = labels => {
    const theme = useTheme();

    return {
        chart: {
            background: 'transparent',
        },
        colors: [
            theme.palette.primary.main,
            theme.palette.success.main,
            theme.palette.warning.main,
        ],
        dataLabels: {
            enabled: false,
        },
        labels,
        legend: {
            show: false,
        },
        plotOptions: {
            pie: {
                expandOnClick: false,
            },
        },
        states: {
            active: {
                filter: {
                    type: 'none',
                },
            },
            hover: {
                filter: {
                    type: 'none',
                },
            },
        },
        stroke: {
            width: 0,
        },
        theme: {
            mode: theme.palette.mode,
        },
        tooltip: {
            fillSeriesColor: false,
        },
    };
};

const iconMap = {
    Confirmado: (
        <SvgIcon>
            <UserPlusIcon />
        </SvgIcon>
    ),
    Rechazado: (
        <SvgIcon>
            <UserMinusIcon />
        </SvgIcon>
    ),
    '?': (
        <SvgIcon>
            <UsersIcon />
        </SvgIcon>
    ),
};

export const OverviewTraffic = props => {
    const { chartSeries, labels, sx } = props;
    const chartOptions = useChartOptions(labels);
    console.log(chartSeries);
    return (
        <Card sx={sx}>
            <CardHeader title="Invitados" />
            <CardContent>
                <Chart
                    height={300}
                    options={chartOptions}
                    series={chartSeries}
                    type="donut"
                    width="100%"
                />
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="center"
                    spacing={2}
                    sx={{ mt: 2 }}
                >
                    {chartSeries.map((item, index) => {
                        const label = labels[index];
                        return (
                            <Box
                                key={label}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                {iconMap[label]}
                                <Typography sx={{ my: 1 }} variant="span">
                                    {label}
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                    variant="subtitle2"
                                >
                                    {item}%
                                </Typography>
                            </Box>
                        );
                    })}
                </Stack>
            </CardContent>
        </Card>
    );
};

OverviewTraffic.propTypes = {
    chartSeries: PropTypes.array.isRequired,
    labels: PropTypes.array.isRequired,
    sx: PropTypes.object,
};
