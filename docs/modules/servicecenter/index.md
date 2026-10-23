---
# Handcrafted landing — GenNamaDocsIndex skips this file because of the .custom-index
# marker in this folder (see hasHandcraftedHomePage in GenNamaDocsIndex.java)
title: Service Center
description: "Landing page for the Service Center module: the workshop, the car showroom, insurance and instalment paperwork, the rental register and reception queues, and where to start reading for each."
---

# Service Center

Nama Service Center is built for the motor trade. It covers the workshop that repairs cars, the showroom that sells them, the insurance and financing paperwork that goes with a sale, a small vehicle-rental register, and the ticket queue at the reception desk.

It helps to know from the start that these are **four largely independent products that share one menu**, not one system that follows a car from cradle to grave. The workshop keeps its own vehicle file; the showroom keeps its own car record with the chassis and engine numbers. A car sold through the showroom does not automatically appear as a serviceable vehicle in the workshop, and the two records are not joined. Read the overview before anything else — it explains the split, the two menu roots, and which of the six licences unlocks what.

The second thing worth knowing early is that **almost nothing here works out of the box**. Every screen in the module is licence-gated, and the car-tracking half needs a feature switch, per-item setup and a screen change before you can even type a chassis number. The getting-started page walks through that in the order that avoids dead ends.

## Start Here

The map of the module, the settings, and the order to set a fresh database up in.

<LandingGrid>
  <LandingCard icon="🗺️" title="Service Center Overview" link="/modules/servicecenter/servicecenter-overview.md" details="The four products, the two menu roots, the six licences and what each unlocks, and why the sold car and the serviced car are separate records." />
  <LandingCard icon="🚀" title="Getting Started" link="/modules/servicecenter/servicecenter-getting-started.md" details="The order to build a fresh installation in, and the three-part setup that car tracking needs before it will work at all." />
  <LandingCard icon="⚙️" title="Configuration" link="/modules/servicecenter/servicecenter-configuration.md" details="The module settings screen option by option." />
  <LandingCard icon="📊" title="Reports and Printed Forms" link="/modules/servicecenter/servicecenter-reports-and-forms.md" details="What ships for reporting and printing, which is very little — and what does not exist despite appearances." />
</LandingGrid>

## The Workshop

Setting up the shop, then taking a car in, quoting the work, doing it, and handing the car back.

<LandingGrid>
  <LandingCard icon="🔧" title="Workshop Setup" link="/modules/servicecenter/workshop-setup/servicecenter-work-centers.md" details="Work centres, the task catalogue and its standard hours, priced service bundles, the vehicle file, and brands and models." />
  <LandingCard icon="📋" title="Job Order Cycle" link="/modules/servicecenter/job-cycle/servicecenter-job-cycle-overview.md" details="Service request, estimation, job order, closing, invoicing and gate pass — the spine of the workshop." />
  <LandingCard icon="💰" title="The Payer Split" link="/modules/servicecenter/job-cycle/servicecenter-payer-split.md" details="Dividing one repair between the customer, the insurer, the warranty and the workshop's own account — and what reaches the ledger." />
  <LandingCard icon="🛠️" title="Workshop Execution" link="/modules/servicecenter/workshop-execution/servicecenter-production-execution.md" details="Recording who worked on what and for how long, pausing and resuming work, and the daily loading table." />
  <LandingCard icon="🔩" title="Spare Parts" link="/modules/servicecenter/spare-parts/servicecenter-spare-parts-overview.md" details="Requesting, issuing and returning parts against a job, how they are costed and priced, and sending work to an outside workshop." />
  <LandingCard icon="🔍" title="Inspections and Trips" link="/modules/servicecenter/inspections-and-campaigns/servicecenter-inspections.md" details="Checklist inspections against a vehicle, and the fleet trip log." />
  <LandingCard icon="📢" title="Recall Campaigns" link="/modules/servicecenter/inspections-and-campaigns/servicecenter-recall-campaigns.md" details="Listing the vehicles a manufacturer recall covers, blocking job orders until the recall is done, and ticking each vehicle off." />
</LandingGrid>

## The Showroom

Buying cars into stock, tracking each chassis, and selling and delivering them.

<LandingGrid>
  <LandingCard icon="🚗" title="Cars Setup" link="/modules/servicecenter/cars-setup/servicecenter-cars-overview.md" details="The car record with its chassis and engine numbers, and the status configuration that defines the whole vehicle lifecycle." />
  <LandingCard icon="📦" title="Car Purchases" link="/modules/servicecenter/car-purchasing/car-purchase-order.md" details="Ordering, receiving and invoicing cars into stock, adding landed cost, returns, and building a vehicle from its parts." />
  <LandingCard icon="🏷️" title="Car Sales" link="/modules/servicecenter/car-sales/car-sales-cycle.md" details="Quotation to order, allocating a specific chassis, invoicing, final delivery, returns, the cancellation documents and traffic letters." />
  <LandingCard icon="🛡️" title="Car Insurance" link="/modules/servicecenter/car-insurance/car-insurance-overview.md" details="Insurance programmes, the customer policy record, and the documents that order, receive, deliver, renew and cancel a policy." />
  <LandingCard icon="🧮" title="Car Instalments" link="/modules/servicecenter/car-installments/car-installment-programs.md" details="Financing programmes and the instalment quotation you print for a customer." />
</LandingGrid>

## Around the Branch

The smaller registers that sit alongside the workshop and the showroom.

<LandingGrid>
  <LandingCard icon="🎫" title="Service Queues" link="/modules/servicecenter/service-queues/servicecenter-queue-overview.md" details="The reception ticket system — ticket printer, display screen and advisor console, and how a ticket is closed." />
  <LandingCard icon="🔑" title="Rental Assets" link="/modules/servicecenter/rental-assets/servicecenter-rental-overview.md" details="A separate register of bookable vehicles, their hourly and daily rates, reservations and rental invoices." />
  <LandingCard icon="🚚" title="Mobile Delivery" link="/modules/servicecenter/mobile-delivery/servicecenter-mobile-delivery-overview.md" details="Courier route sheets for the delivery phone app, and recording what the customer actually received." />
  <LandingCard icon="📑" title="Document Terms" link="/modules/servicecenter/document-terms/servicecenter-terms-basics.md" details="How the module's documents are configured — accounts, generation settings, and the traps worth knowing about." />
</LandingGrid>
