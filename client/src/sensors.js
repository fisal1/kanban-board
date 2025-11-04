import { useSensors, useSensor, PointerSensor } from "@hello-pangea/dnd";

export const useSensitiveSensors = () =>
  useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1, // start dragging after just 1px movement
      },
    })
  );
