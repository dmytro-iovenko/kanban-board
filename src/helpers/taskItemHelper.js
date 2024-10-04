export function parseJsonAndJoinParagraphs(json) {
    // Check if the JSON object is valid and has content
    if (!json || !json.content) {
        return '';
    }

    // Initialize an array to hold the paragraph texts
    const paragraphs = [];

    // Recursive function to extract text from content
    function extractText(content) {
        content.forEach(item => {
            if (item.type === 'paragraph') {
                const paragraphText = item.content.map(element => {
                    if (element.type === 'text') {
                        return element.text;
                    } else if (element.type === 'emoji') {
                        return element.attrs.text; // Get the emoji text
                    }
                    return '';
                }).join('');
                
                // Add paragraph text to the array if it's not empty
                if (paragraphText) {
                    paragraphs.push(paragraphText);
                }
            } else if (item.content) {
                extractText(item.content); // Recur for nested content
            }
        });
    }

    // Extract text from the main content
    extractText(json.content);

    // Join all paragraphs into a single string and limit to 200 characters
    const message = paragraphs.join(' ').trim();
    return message.length > 200 ? message.substring(0, 200) : message;
}