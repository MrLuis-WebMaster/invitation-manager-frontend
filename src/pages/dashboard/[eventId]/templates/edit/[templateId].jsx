import React, { useRef, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import grapesjs from 'grapesjs';
import 'grapesjs-preset-webpage';
import 'grapesjs/dist/css/grapes.min.css';
import api from '@/utils/requestApi';
import { EventContext } from '@/contexts/Event/EventProvider';
import TemplateLayout from '@/layouts/template/layout';

const TemplateCreator = () => {
    const editorRef = useRef();
    const router = useRouter();
    const [template, setTemplate] = useState({});
    const { createEventTemplate } = useContext(EventContext);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const saveTemplate = async () => {
        const html = editorRef.current.getHtml();
        const css = editorRef.current.getCss();
        const js = editorRef.current.getJs();
        try {
            createEventTemplate({
                name: template.name,
                description: template.description,
                previewImage: template.previewImage,
                html,
                css,
                js,
                eventId: template.EventId,
                templateId: router.query.templateId,
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                if (router.query.templateId) {
                    const data = await api(
                        'GET',
                        `event/template/${router.query.eventId}`
                    );
                    setTemplate(data.body);
                    editorRef.current.setComponents(data.body.html);
                    editorRef.current.load();
                }
            } catch (error) {
                console.error(error);
            }
        };

        editorRef.current = grapesjs.init({
            container: '#gjs',
            height: '100vh',
            storageManager: null,
            canvas: {
                styles: [],
            },
        });

        if (!editorRef.current) return;

        editorRef.current.Commands.add('exit-editor', {
            run: function (editor) {
                router.push(`/dashboard/${template.EventId}/templates`);
            },
            stop: function (editor) {},
        });

        editorRef.current.Panels.addButton('options', {
            id: 'save-template',
            className: 'fa fa-floppy-o',
            command: saveTemplate,
            attributes: {
                title: 'Guardar',
            },
            priority: 1,
        });

        editorRef.current.Panels.addButton('options', {
            id: 'exit-template',
            className: 'fa fa-times-circle',
            command: 'exit-editor',
            attributes: {
                title: 'Salir',
            },
            priority: 2,
        });

        fetchTemplate();

        return () => {
            editorRef.current.destroy();
        };
    }, [router, router.query.templateId, template?.id]);

    return (
        <>
            <div id="gjs" style={{ width: '100%' }}>
                <div className="gjs-pn-commands"></div>
                <div className="panel__buttons"></div>
            </div>
        </>
    );
};

TemplateCreator.getLayout = page => <TemplateLayout>{page}</TemplateLayout>;

export default TemplateCreator;
