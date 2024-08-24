"use client";

import Accordion from "../components/accordion/accordion"

const accordionData = [
    {
        title: "Mental Health",
        subtitle: "Why Mental Health Matters",
        text: "Mental health is just as important as physical health, yet it's often overlooked. Mental health affects how we think, feel, and behave. It's the foundation of our overall well-being. Without good mental health, we can struggle with anxiety, depression, and other mental health issues."
    },
    {
        title: "Benefits of Mindfulness",
        subtitle: "Reduce Stress and Anxiety",
        text: "Mindfulness is the practice of being present in the moment, without judgment. It's about paying attention to our thoughts, feelings, and sensations without getting caught up in them. Mindfulness has numerous benefits, including reducing stress and anxiety, improving sleep, and increasing focus and productivity. It's a simple yet powerful tool for improving our overall well-being. By incorporating mindfulness into our daily routine, we can cultivate a greater sense of calm, clarity, and purpose."
    },
    {
        title: "Importance of Self-Care",
        subtitle: "Prioritize Your Well-being",
        text: "Self-care is the practice of taking care of ourselves, physically, emotionally, and mentally. It's about prioritizing our own needs and well-being. Self-care is essential for maintaining our overall health and well-being. It's not selfish, it's necessary. By prioritizing self-care, we can reduce stress and anxiety, improve our mood, and increase our energy and motivation. It's a simple yet powerful way to take care of ourselves and live a happier, healthier life."
    },
    {
        title: "The Importance of Exercise",
        subtitle: "Promote Healthy Living",
        text: "Regular exercise is essential for maintaining physical and mental health. It can help reduce the risk of chronic diseases, improve mood and energy levels, and boost overall well"
    },
    {
        title: "The Power of Gratitude",
        subtitle: "Increase Happiness and Joy",
        text: "Gratitude is the practice of focusing on the good things in our lives. It's about acknowledging and appreciating the people, experiences, and things that bring us joy. Practicing gratitude has been shown to increase happiness, improve relationships, and even boost our immune system. It's a simple yet powerful way to shift our focus away from negativity and towards the positive. By incorporating gratitude into our daily routine, we can cultivate a more optimistic outlook and a greater sense of well-being."
    },
    // {
    //     title: "The Importance of Sleep",
    //     subtitle: "Improve Sleep Quality",
    //     text: "Getting enough quality sleep is crucial for our physical and mental health. Sleep plays a vital role in our overall well-"
    // }
    
];

export default function Page() {
    return (
        <div className="w-full h-full p-4 pl-0 flex items-center justify-center">
            <div className="md:w-96">
                <Accordion.Root>
                    <Accordion.Title>Accordion Title</Accordion.Title>
                    {accordionData.map((item, index) => {
                        return (
                            <Accordion.Item key={index} id={index} thumbnail={`https://fluid-material.vercel.app/images/${index + 1}.webp`}>
                                <Accordion.ItemTitle>{item.title}</Accordion.ItemTitle>
                                <Accordion.ItemSubtitle>{item.subtitle}</Accordion.ItemSubtitle>
                                <Accordion.Content>
                                <div className="flex flex-col gap-6 py-3">
                                    <p>{item.text}</p>
                                    <img className="w-full h-48 transition rounded-lg object-cover" src={`https://fluid-material.vercel.app/images/${index + 5}.webp`} alt="sample" />
                                    <p>Quidem aperiam quae magni provident quis. Blanditiis veniam, quia doloremque hic assumenda natus repellendus. Ullam recusandae, suscipit placeat alias sapiente minus vitae facilis ipsam veritatis, fugit cumque sunt tempora voluptas.</p>
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <img className="w-full h-full aspect-[4/3] rounded object-cover" src={`https://fluid-material.vercel.app/images/${index + 1}.webp`} alt="second" />
                                        </div>
                                        <div className="flex-1">
                                            <img className="w-full h-full aspect-[4/3] rounded object-cover" src={`https://fluid-material.vercel.app/images/${index + 2}.webp`} alt="second" />
                                        </div>
                                    </div>
                                    <p className="text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo ullam at repudiandae odit temporibus commodi nobis incidunt provident eius libero dolores dignissimos, facere ipsa labore, tenetur eligendi sint voluptatum ab facilis.</p>
                                    <p>Created by <a className="underline" href="https://raayyananan.vercel.app" target="blank">rayyan tariq</a></p>
                                </div>
                                </Accordion.Content>
                            </Accordion.Item>
                        )
                    })}
                </Accordion.Root>
            </div>
        </div>
    )
}
