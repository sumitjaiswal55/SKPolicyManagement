import { useState } from "react";

import Sidebar from "./components/Sidebar";
import MobileHeader from "./components/MobileHeader";

import AddCustomerModal from "./components/AddCustomerModal";
import AddPolicyModal from "./components/AddPolicyModal";
import RecordPaymentModal from "./components/RecordPaymentModal";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import CustomerDetails from "./pages/CustomerDetails";
import Policies from "./pages/Policies";
import PolicyDetails from "./pages/PolicyDetails";
import Payments from "./pages/Payments";
import Renewals from "./pages/Renewals";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import {
  customers as initialCustomers,
  policies as initialPolicies,
  payments as initialPayments,
} from "./data/mockData";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [page, setPage] = useState("dashboard");

  const [customers, setCustomers] = useState(initialCustomers);
  const [policies, setPolicies] = useState(initialPolicies);
  const [payments, setPayments] = useState(initialPayments);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const [customerModal, setCustomerModal] = useState(false);
  const [policyModal, setPolicyModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);

  function navigate(nextPage) {
    setPage(nextPage);
    setSidebarOpen(false);
  }

  function openCustomer(customer) {
    setSelectedCustomer(customer);
    setPage("customer-details");
  }

  function openPolicy(policy) {
    setSelectedPolicy(policy);
    setPage("policy-details");
  }

  function handleAddCustomer(customer) {
    setCustomers((prev) => [customer, ...prev]);
  }

  function handleAddPolicy(policy) {
    setPolicies((prev) => [policy, ...prev]);

    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === policy.customerId
          ? {
              ...customer,
              policies: customer.policies + 1,
            }
          : customer
      )
    );
  }

  function handleAddPayment(payment) {
    setPayments((prev) => [payment, ...prev]);
  }

  function renderPage() {
    switch (page) {
      case "dashboard":
  return (
    <Dashboard
      customers={customers}
      policies={policies}
      payments={payments}
      onAddCustomer={() => setCustomerModal(true)}
      onCustomer={openCustomer}
      onPolicy={openPolicy}
      onNavigate={navigate}
    />
  );

      case "customers":
        return (
          <Customers
            customers={customers}
            onCustomer={openCustomer}
            onAdd={() => setCustomerModal(true)}
          />
        );

      case "customer-details":
  return (
    <CustomerDetails
      customer={selectedCustomer}
      policies={policies}
      onBack={() => navigate("customers")}
      onPolicy={openPolicy}
    />
  );

      case "policies":
        return (
          <Policies
            policies={policies}
            onPolicy={openPolicy}
            onAdd={() => setPolicyModal(true)}
          />
        );

      case "policy-details":
        return (
          <PolicyDetails
            policy={selectedPolicy}
            onBack={() => navigate("policies")}
            onPayment={() => setPaymentModal(true)}
          />
        );

      case "payments":
        return <Payments payments={payments} />;

      case "renewals":
        return <Renewals policies={policies} />;

      case "reports":
        return (
          <Reports
            policies={policies}
            payments={payments}
          />
        );

      case "settings":
        return <Settings />;

      default:
        return <Dashboard />;
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={navigate}
        currentPage={page}
      />

      <div className="min-w-0 flex-1">
        <MobileHeader
          onMenuClick={() => setSidebarOpen(true)}
        />

        {renderPage()}
      </div>

      <AddCustomerModal
        open={customerModal}
        onClose={() => setCustomerModal(false)}
        onAdd={handleAddCustomer}
      />

      <AddPolicyModal
        open={policyModal}
        onClose={() => setPolicyModal(false)}
        onAdd={handleAddPolicy}
        customers={customers}
      />

      <RecordPaymentModal
        open={paymentModal}
        onClose={() => setPaymentModal(false)}
        onAdd={handleAddPayment}
        policies={policies}
      />
    </div>
  );
}