import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
}

export const blogCategories = [
  "All",
  "Buying Guides",
  "Patient Education",
  "Insurance",
  "Safety Tips",
  "Product Spotlight",
  "Caregiver Resources",
  "Industry News",
];

export const blogPosts: BlogPost[] = [
  {
    id: "how-to-choose-wheelchair",
    title: "How to Choose the Right Wheelchair for Your Needs",
    excerpt: "A comprehensive guide to selecting the perfect wheelchair based on lifestyle, mobility level, and insurance coverage.",
    content: `Choosing the right wheelchair is one of the most important decisions for anyone with mobility challenges. The right chair can dramatically improve your quality of life, while the wrong one can lead to discomfort, injury, and frustration.\n\n## Assess Your Mobility Needs\n\nThe first step is understanding your daily activities. Do you need a wheelchair for all-day use, or primarily for longer outings? Will you be navigating tight indoor spaces, or mostly using it outdoors?\n\n## Manual vs. Power Wheelchairs\n\nManual wheelchairs are lighter, more affordable, and easier to transport. They're ideal for users with good upper body strength. Power wheelchairs offer independence for those with limited strength or endurance, with features like tilt-in-space and programmable controls.\n\n## Key Features to Consider\n\n- **Seat width and depth**: Proper sizing prevents pressure sores and improves posture\n- **Weight capacity**: Ensure the chair supports your weight with a safety margin\n- **Wheel type**: Pneumatic tires offer a smoother ride; solid tires require less maintenance\n- **Folding mechanism**: Important for transport and storage\n\n## Insurance Coverage\n\nMedicare Part B covers wheelchairs as DME when prescribed by a doctor. You'll typically pay 20% of the Medicare-approved amount after meeting your deductible. Many private insurers follow similar guidelines.\n\n## Our Recommendation\n\nWork with a certified ATP (Assistive Technology Professional) to get properly fitted. At Squad Medical, our team includes ATPs who can guide you through the selection process at no additional cost.`,
    image: blog1,
    date: "Jan 15, 2026",
    category: "Buying Guides",
    readTime: "6 min read",
    author: "Dr. Sarah Mitchell",
  },
  {
    id: "understanding-cpap-therapy",
    title: "Understanding CPAP Therapy: A Patient's Guide",
    excerpt: "Everything you need to know about CPAP machines, from setup to maintenance, and how to maximize your sleep therapy.",
    content: `CPAP (Continuous Positive Airway Pressure) therapy is the gold standard treatment for obstructive sleep apnea. While it can take time to adjust, most patients report dramatically improved sleep quality within weeks.\n\n## How CPAP Works\n\nA CPAP machine delivers a steady stream of pressurized air through a mask, keeping your airway open during sleep. This prevents the pauses in breathing that characterize sleep apnea.\n\n## Getting Started\n\nYour sleep specialist will prescribe a specific pressure setting based on your sleep study results. Modern auto-adjusting (APAP) machines can vary pressure throughout the night for optimal comfort.\n\n## Choosing the Right Mask\n\n- **Nasal masks**: Cover only the nose; good for side sleepers\n- **Full-face masks**: Cover nose and mouth; ideal if you breathe through your mouth\n- **Nasal pillows**: Minimal contact; best for claustrophobic patients\n\n## Maintenance Tips\n\n1. Clean your mask daily with mild soap and water\n2. Replace filters monthly (or as recommended)\n3. Clean the humidifier chamber weekly\n4. Replace tubing every 3 months\n5. Replace masks every 6-12 months\n\n## Common Challenges\n\nMany new users experience dry mouth, nasal congestion, or mask discomfort. Using a heated humidifier and properly fitting your mask can resolve most issues. Don't give up—it typically takes 2-4 weeks to fully adjust.`,
    image: blog2,
    date: "Jan 8, 2026",
    category: "Patient Education",
    readTime: "8 min read",
    author: "James Rodriguez, RRT",
  },
  {
    id: "medicare-coverage-dme-2026",
    title: "Medicare Coverage for DME: What's Covered in 2026",
    excerpt: "Navigate the complexities of Medicare Part B coverage for durable medical equipment, including recent policy updates.",
    content: `Understanding Medicare coverage for Durable Medical Equipment (DME) can be overwhelming. This guide breaks down the key changes for 2026 and helps you maximize your benefits.\n\n## What Qualifies as DME?\n\nMedicare defines DME as equipment that is:\n- Durable (can withstand repeated use)\n- Used for a medical purpose\n- Not useful to someone who isn't sick or injured\n- Used in the home\n- Expected to last at least 3 years\n\n## 2026 Coverage Updates\n\nSeveral important changes took effect this year:\n- **Expanded telehealth evaluations**: DME prescriptions can now be issued via telehealth visits\n- **Updated fee schedules**: Reimbursement rates adjusted for inflation\n- **New competitive bidding areas**: Check if your region is affected\n\n## Common Covered Items\n\n- Wheelchairs and power mobility devices\n- Hospital beds\n- Oxygen equipment and supplies\n- CPAP machines and accessories\n- Walkers and rollators\n- Patient lifts\n\n## Cost to You\n\nAfter meeting your Part B deductible ($240 in 2026), Medicare typically pays 80% of the approved amount. You're responsible for the remaining 20%, which may be covered by supplemental insurance.\n\n## Prior Authorization\n\nSome items require prior authorization. Your DME supplier should handle this process, but it's good to confirm before placing an order.`,
    image: blog3,
    date: "Dec 28, 2025",
    category: "Insurance",
    readTime: "5 min read",
    author: "Linda Chen, CPC",
  },
  {
    id: "home-safety-fall-prevention",
    title: "Home Safety Modifications for Fall Prevention",
    excerpt: "Practical tips and equipment recommendations to make your home safer and reduce the risk of falls for seniors.",
    content: `Falls are the leading cause of injury among adults over 65. The good news is that most falls are preventable with the right home modifications and equipment.\n\n## Bathroom Safety\n\nThe bathroom is the most dangerous room in the house for seniors:\n- Install grab bars near the toilet and in the shower\n- Use a shower chair or transfer bench\n- Add non-slip mats inside and outside the tub\n- Consider a raised toilet seat for easier transfers\n\n## Bedroom Modifications\n\n- Ensure adequate lighting, especially for nighttime trips to the bathroom\n- Keep a clear path from bed to door\n- Consider a hospital bed with adjustable height for easier entry/exit\n- Use bed rails if recommended by your healthcare provider\n\n## General Home Safety\n\n- Remove throw rugs or secure them with double-sided tape\n- Install handrails on both sides of staircases\n- Improve lighting throughout the home\n- Keep frequently used items within easy reach\n- Clear clutter from walkways\n\n## Mobility Equipment\n\nThe right mobility device can dramatically reduce fall risk:\n- **Rollators** provide stability with the convenience of a built-in seat\n- **Quad canes** offer more stability than standard canes\n- **Knee scooters** are excellent for post-surgical recovery`,
    image: blog1,
    date: "Dec 20, 2025",
    category: "Safety Tips",
    readTime: "7 min read",
    author: "Maria Santos, OTR/L",
  },
  {
    id: "portable-oxygen-concentrators",
    title: "The Benefits of Portable Oxygen Concentrators",
    excerpt: "How modern portable oxygen concentrators are giving patients the freedom to travel and maintain active lifestyles.",
    content: `Portable oxygen concentrators (POCs) have revolutionized supplemental oxygen therapy, giving patients unprecedented freedom to travel, socialize, and maintain active lifestyles.\n\n## How POCs Work\n\nUnlike traditional oxygen tanks that store compressed oxygen, POCs draw in ambient air, filter out nitrogen, and deliver concentrated oxygen. This means you never run out of oxygen—as long as you have battery or AC power.\n\n## Key Benefits\n\n- **Travel freedom**: Most modern POCs are FAA-approved for air travel\n- **Lightweight**: Units weigh as little as 4.7 lbs\n- **Quiet operation**: Modern units operate at whisper-quiet levels\n- **No refills**: Never worry about running out of oxygen\n- **Battery life**: Up to 13 hours on a single charge\n\n## Choosing the Right POC\n\nConsider these factors:\n1. **Flow type**: Pulse dose vs. continuous flow\n2. **Oxygen output**: Measured in liters per minute (LPM)\n3. **Battery life**: How long do you need between charges?\n4. **Weight**: Important if you'll carry it frequently\n5. **Noise level**: Matters for social settings and sleep\n\n## Insurance Coverage\n\nMedicare covers oxygen equipment when your blood oxygen level falls below certain thresholds. Your doctor will need to document medical necessity through testing.`,
    image: blog2,
    date: "Dec 12, 2025",
    category: "Product Spotlight",
    readTime: "4 min read",
    author: "Dr. Robert Hayes",
  },
  {
    id: "caregiver-hospital-bed-setup",
    title: "Caregiver's Guide to Hospital Bed Setup at Home",
    excerpt: "Step-by-step instructions for setting up and maintaining a hospital bed in a home environment.",
    content: `Setting up a hospital bed at home can feel daunting, but with proper planning and the right resources, you can create a comfortable and safe care environment.\n\n## Choosing the Right Location\n\n- Select a room on the main floor if possible\n- Ensure easy access to a bathroom\n- Allow at least 3 feet of clearance on both sides\n- Position near electrical outlets for the bed controls\n- Consider proximity to common areas to reduce isolation\n\n## Types of Hospital Beds\n\n- **Full-electric**: Easiest to operate; adjusts head, foot, and height electrically\n- **Semi-electric**: Electric head and foot; manual height adjustment\n- **Manual**: All adjustments made with hand cranks; most affordable\n\n## Essential Accessories\n\n- **Pressure-relief mattress**: Prevents pressure sores for extended bed rest\n- **Side rails**: Provide safety and assist with repositioning\n- **Overbed table**: Allows eating and activities in bed\n- **Trapeze bar**: Helps patients reposition themselves\n\n## Maintenance Schedule\n\n- Weekly: Clean all surfaces with disinfectant\n- Monthly: Check all electrical connections and moving parts\n- Quarterly: Inspect mattress for wear; rotate if applicable\n- Annually: Professional maintenance check\n\n## Caregiver Ergonomics\n\nAdjust the bed height to protect your own back when providing care. The bed should be at your hip height when providing hands-on assistance.`,
    image: blog3,
    date: "Dec 5, 2025",
    category: "Caregiver Resources",
    readTime: "6 min read",
    author: "Karen Williams, RN",
  },
  {
    id: "walkers-vs-rollators",
    title: "Walkers vs. Rollators: Which Is Right for You?",
    excerpt: "Compare standard walkers and rollators to find the best mobility aid for your situation and lifestyle.",
    content: `Both walkers and rollators help improve mobility and prevent falls, but they serve different needs. Understanding the differences can help you make the right choice.\n\n## Standard Walkers\n\nStandard walkers have no wheels and must be lifted with each step. They provide maximum stability and are best for:\n- Patients recovering from surgery\n- Those who need significant weight-bearing support\n- Indoor use on flat surfaces\n\n## Rollators\n\nRollators have four wheels, hand brakes, and typically include a padded seat. They're ideal for:\n- Users who can walk but need balance support\n- Active individuals who walk longer distances\n- Outdoor use on varied terrain\n\n## Making Your Decision\n\nConsider your specific situation:\n1. **Balance**: If you have significant balance issues, a standard walker may be safer\n2. **Distance**: Rollators are better for longer walks since you can sit and rest\n3. **Terrain**: Rollators handle outdoor surfaces better\n4. **Upper body strength**: Standard walkers require more arm strength\n5. **Recovery stage**: Many patients start with walkers and transition to rollators`,
    image: blog1,
    date: "Nov 28, 2025",
    category: "Buying Guides",
    readTime: "5 min read",
    author: "Dr. Sarah Mitchell",
  },
  {
    id: "bath-safety-equipment-guide",
    title: "Essential Bath Safety Equipment for Seniors",
    excerpt: "A complete overview of bathroom safety products that help prevent slips, falls, and injuries in wet environments.",
    content: `The bathroom presents unique safety challenges due to wet surfaces, hard fixtures, and the physical demands of bathing. The right equipment can make a significant difference.\n\n## Grab Bars\n\nGrab bars are the single most important bathroom safety investment:\n- Install at toilet, shower entry, and inside the shower\n- Choose bars rated for at least 250 lbs\n- Professional installation into wall studs is recommended\n- Suction cup bars are NOT a safe substitute\n\n## Shower Chairs and Transfer Benches\n\n- **Shower chairs**: Best for walk-in showers; adjustable height\n- **Transfer benches**: Extend over the tub wall for safe entry/exit\n- **Rolling shower commodes**: Combine toileting and bathing support\n\n## Raised Toilet Seats\n\nRaised seats reduce the distance you need to lower yourself, decreasing strain on knees and hips. Options include:\n- Clamp-on risers (2-6 inch height increase)\n- Models with integrated armrests for extra support\n- Padded seats for extended comfort\n\n## Non-Slip Solutions\n\n- Textured bath mats inside the tub\n- Adhesive strips on the shower floor\n- Non-slip rugs outside the tub (with rubber backing)\n- Anti-slip coatings for tile floors`,
    image: blog2,
    date: "Nov 20, 2025",
    category: "Safety Tips",
    readTime: "6 min read",
    author: "Maria Santos, OTR/L",
  },
  {
    id: "nebulizer-therapy-guide",
    title: "Nebulizer Therapy at Home: What You Need to Know",
    excerpt: "Learn how to properly use and maintain your home nebulizer for effective respiratory treatment.",
    content: `Nebulizer therapy delivers medication directly to the lungs as a fine mist, making it easier for patients with respiratory conditions to receive their treatments at home.\n\n## When Is Nebulizer Therapy Prescribed?\n\n- Asthma (especially in children and elderly)\n- COPD (Chronic Obstructive Pulmonary Disease)\n- Cystic fibrosis\n- Bronchiectasis\n- Severe allergic reactions affecting breathing\n\n## Types of Nebulizers\n\n- **Jet (compressor) nebulizers**: Most common; uses compressed air to create mist\n- **Ultrasonic nebulizers**: Uses vibrations; quieter but can't deliver all medications\n- **Mesh nebulizers**: Newest technology; portable and virtually silent\n\n## Proper Technique\n\n1. Wash your hands thoroughly\n2. Measure medication precisely as prescribed\n3. Sit upright during treatment\n4. Breathe slowly and deeply through the mouthpiece\n5. Continue until the medication cup is empty (usually 10-15 minutes)\n\n## Cleaning and Maintenance\n\n- Rinse the nebulizer cup and mouthpiece after each use\n- Disinfect weekly by soaking in vinegar and water solution\n- Replace nebulizer kits every 6 months\n- Change compressor filters as recommended\n- Never share nebulizer accessories between patients`,
    image: blog3,
    date: "Nov 12, 2025",
    category: "Patient Education",
    readTime: "7 min read",
    author: "James Rodriguez, RRT",
  },
  {
    id: "dme-industry-trends-2026",
    title: "DME Industry Trends to Watch in 2026",
    excerpt: "Emerging technologies, policy changes, and market shifts shaping the durable medical equipment landscape this year.",
    content: `The durable medical equipment industry continues to evolve rapidly, driven by technological innovation, demographic shifts, and policy changes. Here are the key trends shaping 2026.\n\n## Smart Connected Devices\n\nIoT-enabled DME is becoming the standard. CPAP machines now transmit compliance data wirelessly, power wheelchairs include GPS tracking, and even hospital beds can monitor patient vitals and alert caregivers.\n\n## Aging Population Growth\n\nThe 65+ population continues to grow, with 10,000 Americans turning 65 every day. This demographic shift is driving demand for home-based care equipment and creating opportunities for innovative solutions.\n\n## Telehealth Integration\n\nRemote monitoring and telehealth visits are now standard for DME evaluation and follow-up. This has expanded access to care in rural areas and streamlined the prescription process.\n\n## Sustainability Focus\n\nManufacturers are increasingly using recycled materials and designing equipment for refurbishment. Equipment take-back programs are gaining popularity, reducing waste and lowering costs.\n\n## Key Policy Changes\n\n- Expanded Medicare coverage for certain home modifications\n- New competitive bidding reforms aimed at improving access\n- Updated quality standards for DME suppliers\n- Increased scrutiny on prior authorization timelines`,
    image: blog1,
    date: "Nov 5, 2025",
    category: "Industry News",
    readTime: "5 min read",
    author: "Michael Torres, MBA",
  },
  {
    id: "patient-lift-selection",
    title: "How to Select the Right Patient Lift for Home Use",
    excerpt: "Navigate the options for patient lifts including hydraulic, electric, and ceiling-mounted systems for home caregiving.",
    content: `Patient lifts are essential for safely transferring individuals with limited mobility, protecting both the patient and caregiver from injury.\n\n## Types of Patient Lifts\n\n### Hydraulic Floor Lifts\n- Operated by a hand pump\n- No electricity required\n- Most affordable option\n- Best for occasional use\n\n### Electric Floor Lifts\n- Battery or AC powered\n- Push-button operation\n- Easier for caregivers to operate solo\n- Recommended for frequent transfers\n\n### Ceiling-Mounted Lifts\n- Permanently installed on ceiling tracks\n- Save floor space\n- Smoothest transfer experience\n- Highest upfront cost but best long-term value\n\n## Weight Capacity Considerations\n\nAlways choose a lift rated well above the patient's weight:\n- Standard lifts: up to 400 lbs\n- Bariatric lifts: 500-1000 lbs\n- Never exceed the rated capacity\n\n## Sling Selection\n\nThe sling is just as important as the lift itself:\n- **Full-body slings**: Most support; best for patients with no trunk control\n- **Toileting slings**: Allow hygiene care without removing the sling\n- **Stand-assist slings**: For patients who can bear some weight\n\n## Safety Tips\n\n- Always lock the lift brakes before transferring\n- Check sling attachment points before each use\n- Ensure adequate training for all caregivers\n- Perform monthly equipment inspections`,
    image: blog2,
    date: "Oct 28, 2025",
    category: "Buying Guides",
    readTime: "8 min read",
    author: "Karen Williams, RN",
  },
  {
    id: "respiratory-equipment-maintenance",
    title: "Maintaining Your Respiratory Equipment: A Complete Checklist",
    excerpt: "Keep your CPAP, nebulizer, and oxygen equipment in peak condition with this comprehensive maintenance guide.",
    content: `Proper maintenance of respiratory equipment is critical for effective therapy and your health. Poorly maintained equipment can harbor bacteria, reduce treatment effectiveness, and void warranties.\n\n## CPAP/BiPAP Maintenance\n\n### Daily\n- Wipe mask cushion with CPAP-safe wipes\n- Empty and rinse humidifier chamber\n\n### Weekly\n- Wash mask components in warm soapy water\n- Clean humidifier chamber thoroughly\n- Wipe down the exterior of the machine\n\n### Monthly\n- Replace disposable filters\n- Inspect tubing for cracks or discoloration\n- Check mask straps for elasticity\n\n### Every 6 Months\n- Replace mask cushion or nasal pillows\n- Replace tubing\n- Replace reusable filters\n\n## Oxygen Concentrator Maintenance\n\n- Clean the exterior weekly with a damp cloth\n- Wash or replace inlet filters every 2 weeks\n- Check nasal cannula or mask for wear\n- Ensure adequate ventilation around the unit\n- Schedule annual professional servicing\n\n## Nebulizer Maintenance\n\n- Rinse after every use\n- Deep clean weekly with vinegar solution\n- Replace nebulizer cups every 6 months\n- Check compressor filters monthly\n- Store in a clean, dry location`,
    image: blog3,
    date: "Oct 20, 2025",
    category: "Patient Education",
    readTime: "6 min read",
    author: "James Rodriguez, RRT",
  },
];
