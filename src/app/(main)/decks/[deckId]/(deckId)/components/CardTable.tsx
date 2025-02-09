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
            Cards in this deck ({cards.length})
          </div>

          <ul className="space-y-3">
            {cards.map((card) => (
              <li
                key={card.id}
                className="flex w-full items-center py-5 bg-white/5 rounded-lg"
              >
                <div className="flex flex-col md:flex-row w-full gap-4">
                  <div className="flex font-semibold md:w-1/3 items-center px-5">
                    {card.question}
                  </div>
                  <div className="md:w-2/3 px-5">{card.answer}</div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default CardTable;
