import { Card } from "@prisma/client";

interface CardTableProps {
  cards: Card[] | undefined;
}

const CardTable = ({ cards }: CardTableProps) => {
  return (
    <>
      {cards && cards.length > 0 && (
        <>
          <div className="my-8 mb-4 text-lg lg:text-xl font-semibold">
            Cards in this deck
          </div>
          <div className="border-2 border-white/5 rounded-lg">
            <div className="flex w-full items-center gap-3 ps-3 p-3 text-white/50">
              <div className="ms-2 w-[5rem]">#</div>
              <div className="ms-2 w-full">Question</div>
              <div className="ms-2 w-full">Answer</div>
            </div>
            {cards.map((card, index) => (
              <div key={card.id}>
                <div className="flex w-full items-center gap-6 p-3 border-t-2 border-white/5 hover:bg-white/5">
                  <div className="text-white/50 ms-2 w-[5rem]">{index + 1}</div>
                  <div className="w-full font-semibold">{card.question}</div>
                  <div className="w-full me-2">{card.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default CardTable;
