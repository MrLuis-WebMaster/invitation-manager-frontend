import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Link } from '@mui/material';

const ExpandMore = styled(props => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export function CompanyCard({ company }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar
                        sx={{ bgcolor: red[500] }}
                        aria-label="Logo"
                        src={company.imageUrl}
                    >
                        R
                    </Avatar>
                }
                title={company.title}
                subheader="Musica"
                sx={{ paddingBottom: 0 }}
            />
            <CardContent sx={{ paddingTop: 1.2, paddingBottom: 1.2 }}>
                <Typography variant="body2" color="text.secondary">
                    {company.introductionMessage}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    component={Link}
                    target="_blank"
                    href={`https://wa.me/${company.contactPhone}`}
                    aria-label="Whatsapp"
                >
                    <WhatsAppIcon />
                </IconButton>
                <Typography sx={{ fontSize: '12px' }}>
                    {company.contactPhone}
                </Typography>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent sx={{ paddingTop: 0 }}>
                    <Typography
                        variant="body1"
                        dangerouslySetInnerHTML={{
                            __html: company.description,
                        }}
                    />
                </CardContent>
            </Collapse>
        </Card>
    );
}
