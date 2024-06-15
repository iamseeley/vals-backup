export async function hostResume(jsonResume, apiKey) {
    const userDetailsEndpoint = 'https://api.val.town/v1/me/';
    const createValEndpoint = 'https://api.val.town/v1/vals/';

    // get user details
    const userDetailsResponse = await fetch(userDetailsEndpoint, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    });

    if (!userDetailsResponse.ok) {
        throw new Error(`Error fetching user details: ${userDetailsResponse.statusText}`);
    }

    const userDetails = await userDetailsResponse.json();
    const username = userDetails.username;

    // create resume json val
    const createValResponse = await fetch(createValEndpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            code: `export default async function handler(req: Request): Promise<Response> {
                const resumeJSON = ${JSON.stringify(jsonResume, null, 2)};
                const resume = JSON.stringify(resumeJSON);
                return new Response(resume, { headers: { "Content-Type": "application/json" } });
            }`,
            type: "http",
            name: "resumeJSON",
            readme: "**🎉 A handler to serve your JSON Resume.**",
            privacy: "public",
        }),
    });

    if (!createValResponse.ok) {
        throw new Error(`Error creating val: ${createValResponse.statusText}`);
    }

    const valData = await createValResponse.json();
    return `https://val.town/v/${username}/${valData.name}`;
}
