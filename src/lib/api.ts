// src/lib/api.ts
export const generateEmailContent = async (prompt: string): Promise<string | null> => {
  try {
    const response = await fetch('/api/generate-email-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate content');
    }

    const data = await response.json();
    return data.message;
  } catch (err) {
    console.error('Error generating content:', err);
    return null;
  }
};
