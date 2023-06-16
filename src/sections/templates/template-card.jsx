import PropTypes from 'prop-types';
import DocumentCheckIcon from '@heroicons/react/24/solid/DocumentCheckIcon';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import {
    Box,
    Card,
    CardContent,
    Divider,
    Stack,
    SvgIcon,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';

export const TemplateCard = props => {
    const { template, selected, openDialog, setNewTemplate } = props;
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelect = () => {
        openDialog(true);
        setNewTemplate(template);
    };

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                backgroundColor: selected ? 'primary.main' : 'inherit',
                color: selected ? 'primary.contrastText' : 'inherit',
            }}
        >
            <Box
                sx={{
                    height: '200px',
                    width: '100%',
                    position: 'relative',
                    flexGrow: 1,
                }}
                onClick={handleOpen}
            >
                <Image
                    src={template.previewImage}
                    alt={template.description}
                    fill
                    style={{ objectFit: 'contain' }}
                />
            </Box>
            <CardContent>
                <Typography align="center" gutterBottom variant="h5">
                    {template.name}
                </Typography>
                <Typography align="center" variant="body1">
                    {template.description}
                </Typography>
            </CardContent>
            <Box sx={{ flexGrow: 1 }} />
            <Divider />
            <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between"
                spacing={2}
                sx={{ p: 2 }}
            >
                {selected && (
                    <Stack alignItems="center" direction="row" spacing={1}>
                        <SvgIcon
                            color={selected ? 'primary.contrastText' : 'action'}
                            fontSize="small"
                        >
                            <PencilIcon />
                        </SvgIcon>
                        <Typography
                            color={
                                selected
                                    ? 'primary.contrastText'
                                    : 'text.secondary'
                            }
                            display="inline"
                            variant="body2"
                        >
                            <Link
                                style={{
                                    textDecoration: 'none',
                                    color: '#fff',
                                }}
                                href={`/dashboard/${router.query.eventId}/templates/edit/${template.id}`}
                            >
                                Editar
                            </Link>
                        </Typography>
                    </Stack>
                )}
                <Stack alignItems="center" direction="row" spacing={1}>
                    <SvgIcon
                        color={selected ? 'primary.contrastText' : 'action'}
                        fontSize="small"
                    >
                        <DocumentCheckIcon />
                    </SvgIcon>

                    {selected ? (
                        <Typography
                            color={
                                selected ? 'primary.contrastText' : 'inherit'
                            }
                            display="inline"
                            variant="body2"
                        >
                            Seleccionado
                        </Typography>
                    ) : (
                        <Typography
                            color={
                                selected ? 'primary.contrastText' : 'inherit'
                            }
                            display="inline"
                            variant="body2"
                            onClick={handleSelect}
                        >
                            Seleccionar
                        </Typography>
                    )}
                </Stack>
            </Stack>
            <Dialog open={open} onClose={handleClose} maxWidth="md">
                <DialogContent>
                    <Box
                        sx={{
                            height: '100%',
                            width: '100%',
                            position: 'relative',
                            display: 'flex',
                            margin: 'auto',
                        }}
                    >
                        <Image
                            src={template.previewImage}
                            alt={template.description}
                            width={800}
                            height={800}
                            style={{ objectFit: 'contain' }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

TemplateCard.propTypes = {
    template: PropTypes.object.isRequired,
};
