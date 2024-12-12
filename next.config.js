const addPoints = async (classId, amount) => {
    console.log('=== Starting addPoints ===');
    try {
        console.log(`Adding ${amount} points to class ${classId}`);
        
        const apiUrl = '/api/points';
        console.log('Calling API:', apiUrl);

        const postData = {
            classId,
            amount,
            date: new Date().toISOString()
        };
        console.log('With data:', postData);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
        });

        console.log('Got response:', response.status);
        
        if (response.ok) {
            console.log('Request successful');
            setPoints(prev => ({
                ...prev,
                [classId]: (prev[classId] || 0) + amount
            }));

            setHistory(prev => [...prev, {
                date: new Date().toLocaleDateString('he-IL'),
                class: classId,
                points: amount,
                type: 'earned'
            }]);
        } else {
            const errorText = await response.text();
            console.error('Request failed:', errorText);
        }
    } catch (error) {
        console.error('Error in addPoints:', error);
    }
    console.log('=== Finished addPoints ===');
};