"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/layout";
import { GradientText } from "@/components/ui/gradient-text";
import { GradientButton } from "@/components/ui/gradient-button";
import { StatCard } from "@/components/ui/stat-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { ProductsTable } from "@/features/marketplace/components/products-table";
import { Product } from "@/features/marketplace/types";
import {
  ShoppingBag,
  CheckCircle,
  AlertTriangle,
  Archive,
  Plus,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const initialProducts: Product[] = [
  {
    id: "PROD001",
    vendorId: "v1",
    name: "Wireless Bluetooth Headphones",
    description:
      "Premium noise-cancelling wireless headphones with 30hr battery",
    price: 89.99,
    currency: "USD",
    category: "Electronics",
    images: [],
    status: "active",
    stock: 245,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    id: "PROD002",
    vendorId: "v2",
    name: "Organic Cotton T-Shirt",
    description: "Eco-friendly organic cotton shirt, available in 8 colors",
    price: 29.99,
    currency: "USD",
    category: "Clothing",
    images: [],
    status: "active",
    stock: 580,
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-03-05"),
  },
  {
    id: "PROD003",
    vendorId: "v1",
    name: "Smart Watch Pro",
    description: "Fitness tracker with heart rate, GPS, and sleep monitoring",
    price: 199.99,
    currency: "USD",
    category: "Electronics",
    images: [],
    status: "active",
    stock: 8,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-03-07"),
  },
  {
    id: "PROD004",
    vendorId: "v3",
    name: "Handmade Leather Wallet",
    description: "Genuine Italian leather bifold wallet",
    price: 49.99,
    currency: "USD",
    category: "Accessories",
    images: [],
    status: "draft",
    stock: 0,
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    id: "PROD005",
    vendorId: "v2",
    name: "Stainless Steel Water Bottle",
    description: "Double-wall insulated 750ml bottle, keeps cold for 24hrs",
    price: 24.99,
    currency: "USD",
    category: "Home & Kitchen",
    images: [],
    status: "active",
    stock: 320,
    createdAt: new Date("2024-02-18"),
    updatedAt: new Date("2024-03-02"),
  },
  {
    id: "PROD006",
    vendorId: "v4",
    name: "Yoga Mat Premium",
    description: "Non-slip eco-friendly yoga mat, 6mm thickness",
    price: 39.99,
    currency: "USD",
    category: "Sports",
    images: [],
    status: "inactive",
    stock: 45,
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-02-28"),
  },
  {
    id: "PROD007",
    vendorId: "v1",
    name: "USB-C Charging Cable 3-Pack",
    description: "Braided nylon fast-charging cables, 1m/2m/3m",
    price: 14.99,
    currency: "USD",
    category: "Electronics",
    images: [],
    status: "active",
    stock: 1200,
    createdAt: new Date("2024-02-25"),
    updatedAt: new Date("2024-03-06"),
  },
  {
    id: "PROD008",
    vendorId: "v3",
    name: "Scented Soy Candle Set",
    description: "Set of 4 hand-poured soy candles, lavender and vanilla",
    price: 34.99,
    currency: "USD",
    category: "Home & Kitchen",
    images: [],
    status: "active",
    stock: 5,
    createdAt: new Date("2024-03-02"),
    updatedAt: new Date("2024-03-07"),
  },
  {
    id: "PROD009",
    vendorId: "v4",
    name: "Running Shoes Ultralight",
    description: "Lightweight mesh running shoes with responsive cushioning",
    price: 119.99,
    currency: "USD",
    category: "Sports",
    images: [],
    status: "active",
    stock: 156,
    createdAt: new Date("2024-01-30"),
    updatedAt: new Date("2024-03-04"),
  },
  {
    id: "PROD010",
    vendorId: "v2",
    name: "Laptop Backpack",
    description: 'Water-resistant backpack fits up to 15.6" laptops',
    price: 59.99,
    currency: "USD",
    category: "Accessories",
    images: [],
    status: "active",
    stock: 89,
    createdAt: new Date("2024-02-14"),
    updatedAt: new Date("2024-03-03"),
  },
  {
    id: "PROD011",
    vendorId: "v1",
    name: "Portable Bluetooth Speaker",
    description: "Waterproof speaker with 12hr playtime",
    price: 44.99,
    currency: "USD",
    category: "Electronics",
    images: [],
    status: "active",
    stock: 210,
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2024-03-06"),
  },
  {
    id: "PROD012",
    vendorId: "v3",
    name: "Ceramic Coffee Mug Set",
    description: "Set of 4 handcrafted ceramic mugs, 350ml each",
    price: 27.99,
    currency: "USD",
    category: "Home & Kitchen",
    images: [],
    status: "draft",
    stock: 0,
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-03-05"),
  },
];

export default function ProductsPage() {
  const { t } = useTranslation();
  const p = "marketplace.productsPage";

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [showCreate, setShowCreate] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "Electronics",
    status: "draft" as Product["status"],
  });

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "Electronics",
      status: "draft",
    });
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const newProduct: Product = {
      id: `PROD-${Date.now()}`,
      vendorId: "v1",
      name: form.name,
      description: form.description,
      price: parseFloat(form.price) || 0,
      currency: "USD",
      category: form.category,
      images: [],
      status: form.status,
      stock: parseInt(form.stock) || 0,
      createdAt: now,
      updatedAt: now,
    };
    setProducts((prev) => [newProduct, ...prev]);
    resetForm();
    setShowCreate(false);
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
      status: product.status,
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProduct) return;
    setProducts((prev) =>
      prev.map((prod) =>
        prod.id === editProduct.id
          ? {
              ...prod,
              name: form.name,
              description: form.description,
              price: parseFloat(form.price) || 0,
              stock: parseInt(form.stock) || 0,
              category: form.category,
              status: form.status,
              updatedAt: new Date(),
            }
          : prod,
      ),
    );
    resetForm();
    setEditProduct(null);
  };

  const handleDelete = () => {
    if (deleteProduct) {
      setProducts((prev) => prev.filter((prod) => prod.id !== deleteProduct.id));
      setDeleteProduct(null);
    }
  };

  const stats = [
    {
      title: t(`${p}.totalProducts`),
      value: "3,456",
      icon: ShoppingBag,
      color: "from-[#7C4099] to-[#01A8A9]",
    },
    {
      title: t(`${p}.active`),
      value: "2,890",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: t(`${p}.lowStock`),
      value: "124",
      icon: AlertTriangle,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: t(`${p}.draft`),
      value: "442",
      icon: Archive,
      color: "from-gray-500 to-slate-500",
    },
  ];

  const inputClass =
    "w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]";

  const formFields = (
    <>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          {t(`${p}.formName`)}
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder={t(`${p}.formNamePlaceholder`)}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          {t(`${p}.formDescription`)}
        </label>
        <textarea
          required
          value={form.description}
          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
          placeholder={t(`${p}.formDescriptionPlaceholder`)}
          rows={3}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            {t(`${p}.formPrice`)}
          </label>
          <input
            type="number"
            step="0.01"
            required
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            placeholder={t(`${p}.formPricePlaceholder`)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            {t(`${p}.formStock`)}
          </label>
          <input
            type="number"
            required
            value={form.stock}
            onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
            placeholder={t(`${p}.formStockPlaceholder`)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            {t(`${p}.formCategory`)}
          </label>
          <select
            required
            value={form.category}
            onChange={(e) =>
              setForm((f) => ({ ...f, category: e.target.value }))
            }
            className={inputClass}
          >
            <option value="Electronics">{t(`${p}.electronics`)}</option>
            <option value="Clothing">{t(`${p}.clothing`)}</option>
            <option value="Accessories">{t(`${p}.accessories`)}</option>
            <option value="Home & Kitchen">{t(`${p}.homeKitchen`)}</option>
            <option value="Sports">{t(`${p}.sports`)}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            {t(`${p}.formStatus`)}
          </label>
          <select
            required
            value={form.status}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                status: e.target.value as Product["status"],
              }))
            }
            className={inputClass}
          >
            <option value="draft">{t("marketplace.draft")}</option>
            <option value="active">{t("marketplace.active")}</option>
            <option value="inactive">{t("marketplace.inactive")}</option>
          </select>
        </div>
      </div>
    </>
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <GradientText>{t(`${p}.heading`)}</GradientText>
            </h1>
            <p className="text-muted-foreground">{t(`${p}.subtitle`)}</p>
          </div>
          <GradientButton onClick={() => setShowCreate(true)}>
            <Plus size={16} className="me-2" />
            {t(`${p}.addProductBtn`)}
          </GradientButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder={t(`${p}.searchPlaceholder`)}
              className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]"
            />
            <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]">
              <option>{t(`${p}.allStatus`)}</option>
              <option>{t("marketplace.active")}</option>
              <option>{t("marketplace.draft")}</option>
              <option>{t("marketplace.inactive")}</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]">
              <option>{t(`${p}.allCategories`)}</option>
              <option>{t(`${p}.electronics`)}</option>
              <option>{t(`${p}.clothing`)}</option>
              <option>{t(`${p}.accessories`)}</option>
              <option>{t(`${p}.homeKitchen`)}</option>
              <option>{t(`${p}.sports`)}</option>
            </select>
          </div>
          <ProductsTable
            data={products}
            onEdit={handleEdit}
            onDelete={(product: Product) => setDeleteProduct(product)}
          />
        </div>
      </div>

      {/* Create Product Modal */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              <GradientText>{t(`${p}.createTitle`)}</GradientText>
            </DialogTitle>
            <DialogDescription>{t(`${p}.subtitle`)}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4">
            {formFields}
            <DialogFooter>
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                {t(`${p}.cancelBtn`)}
              </button>
              <GradientButton type="submit">
                {t(`${p}.submitBtn`)}
              </GradientButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Product Modal */}
      <Dialog
        open={!!editProduct}
        onOpenChange={(open) => {
          if (!open) {
            setEditProduct(null);
            resetForm();
          }
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              <GradientText>{t(`${p}.editTitle`)}</GradientText>
            </DialogTitle>
            <DialogDescription>{t(`${p}.subtitle`)}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEditSubmit} className="space-y-4">
            {formFields}
            <DialogFooter>
              <button
                type="button"
                onClick={() => {
                  setEditProduct(null);
                  resetForm();
                }}
                className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                {t(`${p}.cancelBtn`)}
              </button>
              <GradientButton type="submit">
                {t(`${p}.saveBtn`)}
              </GradientButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteProduct}
        onOpenChange={(open) => !open && setDeleteProduct(null)}
        
      >
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>{t(`${p}.deleteTitle`)}</AlertDialogTitle>
            <AlertDialogDescription>
              {t(`${p}.deleteDescription`, { name: deleteProduct?.name })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              {t(`${p}.cancelBtn`)}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-white hover:bg-destructive/90 cursor-pointer"
            >
              {t(`${p}.deleteBtn`)}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
