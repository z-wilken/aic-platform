export type Category = 'USAGE' | 'OVERSIGHT' | 'TRANSPARENCY' | 'INFRASTRUCTURE';

export interface Question {
    id: string;
    text: string;
    category: Category;
    options: {
        text: string;
        value: number;
    }[];
}

export const questions: Question[] = [
    {
        id: 'usage_1',
        text: 'Does the AI system make final decisions without human intervention?',
        category: 'USAGE',
        options: [
            { text: 'Never', value: 4 },
            { text: 'Rarely', value: 3 },
            { text: 'Frequently', value: 1 },
            { text: 'Always', value: 0 }
        ]
    },
    {
        id: 'oversight_1',
        text: 'Is there a formal appeal process for AI-driven decisions?',
        category: 'OVERSIGHT',
        options: [
            { text: 'Yes, fully independent', value: 4 },
            { text: 'Yes, internal review', value: 2 },
            { text: 'Informal only', value: 1 },
            { text: 'No', value: 0 }
        ]
    },
    {
        id: 'transparency_1',
        text: 'Are users notified when they are interacting with an AI?',
        category: 'TRANSPARENCY',
        options: [
            { text: 'Always and clearly', value: 4 },
            { text: 'In the terms of service only', value: 2 },
            { text: 'Implicitly', value: 1 },
            { text: 'No', value: 0 }
        ]
    },
    {
        id: 'infra_1',
        text: 'Are model cards or technical specifications maintained for all deployed models?',
        category: 'INFRASTRUCTURE',
        options: [
            { text: 'Yes, public/auditable', value: 4 },
            { text: 'Yes, internal only', value: 3 },
            { text: 'Partial', value: 1 },
            { text: 'No', value: 0 }
        ]
    }
];
