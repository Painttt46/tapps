"use server";
import axios from 'axios';
import { cookies } from 'next/headers';

export const fetchLogsData = async () => {
    const cookieStore = await cookies();  
    const accessToken = cookieStore.get('accessToken')?.value;
    
    try {


        const response = await axios.get('http://10.1.10.153:8080/api/logs/', {
            headers: {
                'x-access-token': accessToken
            }
        });
        const rows = [];

        response.data.forEach((item, index) => {
            if (Array.isArray(item.detail)) {
                item.detail.forEach((detailItem, detailIndex) => {
                    rows.push({
                        gridid: `GRID-${item.uuid_id}-${detailIndex}-${index}`,
                        uuid_id: item.uuid_id,
                        catid: item.catid,
                        hostip: item.hostip,
                        hostport: item.hostport,
                        typeid: item.typeid,
                        detail: JSON.stringify(detailItem, null, 2),
                        device_type: item.device_type,
                        updated_at: item.updated_at,
                    });
                });
            } else {
                rows.push({
                    gridid: `GRID-${item.uuid_id}-${index}`,
                    uuid_id: item.uuid_id,
                    catid: item.catid,
                    hostip: item.hostip,
                    hostport: item.hostport,
                    typeid: item.typeid,
                    detail: item.detail ? JSON.stringify(item.detail, null, 2) : '',
                    device_type: item.device_type,
                    updated_at: item.updated_at,
                });
            }
        });

        return rows;
    } catch (error) {
        console.error("Error fetching data: ", error);
        throw error;
    }
};
