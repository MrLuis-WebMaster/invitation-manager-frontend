import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '@/utils/requestApi';
import Head from 'next/head';
const Token = () => {
    const router = useRouter();
    const [guest, setGuest] = useState({});
    const [template, setTemplate] = useState({});

    useEffect(() => {
        const getInfoInvitation = async () => {
            const res = await api(
                'GET',
                `guests/decode/${router.query.tokenUser}`
            );
            setGuest(res.body);

            const templateRes = await api(
                'GET',
                `event/template/${res.body.event.id}`
            );
            setTemplate(templateRes.body);
        };

        if (!router.query.tokenUser) return;
        getInfoInvitation();
    }, [guest?.guest?.name, router.query.tokenUser]);

    return (
        <>
            <Head>
                <title>{guest?.event?.name}</title>
            </Head>
            <style dangerouslySetInnerHTML={{ __html: template.css }} />
            <script dangerouslySetInnerHTML={{ __html: template.js }} />
            <div dangerouslySetInnerHTML={{ __html: template.html }} />
        </>
    );
};

export default Token;
