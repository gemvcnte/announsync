import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AccordionFeedComponent = ({ announcements }) => {
  return (
    <Accordion>
      {announcements.map((announcement) => (
        <AccordionItem key={announcement._id}>
          <AccordionTrigger>
            <img
              src="https://i.stack.imgur.com/frlIf.png"
              alt="user-avatar"
              className="h-[40px] w-[40px] rounded-full "
              style={{ aspectRatio: "40/40", objectFit: "cover" }}
            />
            : {announcement.postedBy} - {announcement.title}
          </AccordionTrigger>
          <AccordionContent>{announcement.description}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionFeedComponent;
