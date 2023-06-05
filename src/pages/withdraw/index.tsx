import { Layout } from "pages/common/Layout";
import { Menus } from "pages/common/Menus";
import { useUserInvests } from "./invests.service";
import { InvestedItem } from "./InvestItem";

function Withdraw() {
  const {
    investedList,
    selectedPair,
    preferredChain,
    onChangePreferredChain,
    selectInvest,
  } = useUserInvests();

  return (
    <Layout>
      <div className="flex items-start justify-between">
        <p className="text-5xl font-bold">Withdraw your assets</p>
        <Menus
          menus={[
            { name: "Home", path: "/" },
            { name: "Gather", path: "/gather" },
            { name: "Invest", path: "/invest" },
          ]}
        />
      </div>
      <div className="grid grid-cols-4 gap-4 mt-8">
        {investedList.map((invested) => (
          <InvestedItem
            investPair={invested.pair}
            balance={invested.balance}
            selected={invested.pair.id === selectedPair?.pair.id}
            select={selectInvest}
          />
        ))}
      </div>
    </Layout>
  );
}

export default Withdraw;
