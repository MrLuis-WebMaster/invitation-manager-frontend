import Head from 'next/head';
import { useState, useEffect, useContext } from 'react';
import {
    Box,
    Container,
    Pagination,
    Stack,
    Typography,
    Unstable_Grid2 as Grid,
    Modal,
    Button,
} from '@mui/material';
import DashboardLayout from 'src/layouts/dashboard/layout';
import { TemplateCard } from 'src/sections/templates/template-card';
import { CompaniesSearch } from 'src/sections/companies/companies-search';
import api from '@/utils/requestApi';
import { EventContext } from '@/contexts/Event/EventProvider';
import { useRouter } from 'next/router';

const Page = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [templates, setTemplates] = useState([]);
    const [newTemplate, setNewTemplate] = useState({});
    const { getEventTemplate, templateSelected, createEventTemplate } =
        useContext(EventContext);
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirm, setConfirm] = useState(false);

    useEffect(() => {
        if (!router.query.eventId) return;
        getEventTemplate(router.query.eventId);
        if (!templateSelected?.TemplateId) return;
        setSelectedTemplate(prevSelectedTemplate => {
            if (prevSelectedTemplate === templateSelected.TemplateId) {
                return templateSelected.TemplateId;
            } else {
                return templateSelected.TemplateId;
            }
        });
    }, [templateSelected?.TemplateId, router.query.eventId]);

    const handleSelectTemplate = templateId => {
        setSelectedTemplate(prevSelectedTemplate => {
            if (prevSelectedTemplate === templateId) {
                return null;
            } else {
                return templateId;
            }
        });
    };

    const handleCreateTemplate = () => {
        handleSelectTemplate(newTemplate.id);
        createEventTemplate({
            templateId: newTemplate.id,
            name: newTemplate.name,
            description: newTemplate.description,
            html: newTemplate.html,
            css: newTemplate.css,
            js: newTemplate.js,
            previewImage: newTemplate.previewImage,
        });
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api('GET', 'templates');
                setTemplates(res.body);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <Head>
                <title>Plantillas | Devias Kit</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">Plantillas</Typography>
                            </Stack>
                        </Stack>
                        <CompaniesSearch />
                        <Grid container spacing={3}>
                            {templates.map(template => (
                                <Grid xs={12} md={6} lg={4} key={template.id}>
                                    <TemplateCard
                                        template={template}
                                        onSelect={handleSelectTemplate}
                                        selected={
                                            selectedTemplate === template.id
                                        }
                                        setNewTemplate={setNewTemplate}
                                        confirm={confirm}
                                        setConfirm={setConfirm}
                                        openDialog={setIsModalOpen}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Pagination count={templates.length} size="small" />
                        </Box>
                    </Stack>
                </Container>
            </Box>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <Typography variant="h6">
                        ¿Está seguro que desea cambiar de plantilla? perderas
                        los cambios en la otra plantilla.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 5 }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                            onClick={() => {
                                handleCreateTemplate();
                            }}
                        >
                            Sí
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => {
                                setIsModalOpen(false);
                            }}
                        >
                            No
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};
Page.getLayout = page => (
    <DashboardLayout menu={'event'}>{page}</DashboardLayout>
);

export default Page;
