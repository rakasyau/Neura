"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Code, BarChart, Sliders, Sparkles } from "lucide-react"
import { GlassCard } from "@/components/ui/GlassCard"
import { algorithms } from "@/lib/data"
import { cn } from "@/lib/utils"

import { InteractiveCodeRunner } from "@/components/features/InteractiveCodeRunner"
import { LinearRegressionSimulator } from "@/components/features/simulators/LinearRegressionSimulator"
import { KMeansSimulator } from "@/components/features/simulators/KMeansSimulator"
import { NeuralNetSimulator } from "@/components/features/simulators/NeuralNetSimulator"
import { DecisionTreeSimulator } from "@/components/features/simulators/DecisionTreeSimulator"
import { RandomForestSimulator } from "@/components/features/simulators/RandomForestSimulator"
import { AuthGuard } from "@/components/auth/AuthGuard"

export default function PlaygroundPage() {
  const [selectedAlgo, setSelectedAlgo] = useState("linear-regression")
  const [viewMode, setViewMode] = useState<"code" | "visual">("visual")

  const getCodeSnippet = (algo: string) => {
    // Linear Regression: algoritma REGRESI — gunakan metrik regresi, bukan accuracy
    if (algo === "linear-regression") {
      return `from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

# Dataset harga rumah (Regresi)
np.random.seed(42)
X = np.random.rand(100, 1) * 100  # Luas rumah (m²)
y = 8.5 * X.squeeze() + 50 + np.random.randn(100) * 30  # Harga (juta Rp)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Model
model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

# Evaluate (metrik REGRESI)
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)
print(f"Slope: {model.coef_[0]:.2f}, Intercept: {model.intercept_:.2f}")
print(f"MSE: {mse:.2f}, RMSE: {rmse:.2f}, R²: {r2:.4f}")`
    }

    // K-Means: algoritma UNSUPERVISED — tidak ada label, tidak ada train/test split
    if (algo === "k-means") {
      return `from sklearn.cluster import KMeans
from sklearn.datasets import load_iris
from sklearn.metrics import silhouette_score

# Load data TANPA label (unsupervised)
X = load_iris().data

# Elbow Method: cari K optimal
for k in range(2, 7):
    model = KMeans(n_clusters=k, random_state=42, n_init=10)
    model.fit(X)  # Hanya X, tanpa y!
    sil = silhouette_score(X, model.labels_)
    print(f"K={k} | Inertia: {model.inertia_:.2f} | Silhouette: {sil:.4f}")

# Model final dengan K=3
model = KMeans(n_clusters=3, random_state=42, n_init=10)
model.fit(X)
print(f"\\nCluster labels: {model.labels_[:10]}")
print(f"Distribusi: {[sum(model.labels_==i) for i in range(3)]}")`
    }

    // Algoritma klasifikasi lainnya — gunakan dataset Iris + accuracy_score
    const moduleMap: Record<string, string> = {
      "decision-tree": "tree",
      "random-forest": "ensemble",
      "svm": "svm",
      "knn": "neighbors",
      "gradient-boosting": "ensemble",
      "neural-network": "neural_network",
    }
    const classMap: Record<string, string> = {
      "decision-tree": "DecisionTreeClassifier",
      "random-forest": "RandomForestClassifier",
      "svm": "SVC",
      "knn": "KNeighborsClassifier",
      "gradient-boosting": "GradientBoostingClassifier",
      "neural-network": "MLPClassifier",
    }
    const initMap: Record<string, string> = {
      "decision-tree": "DecisionTreeClassifier(max_depth=3)",
      "random-forest": "RandomForestClassifier(n_estimators=100)",
      "svm": "SVC(kernel='rbf')",
      "knn": "KNeighborsClassifier(n_neighbors=5)",
      "gradient-boosting": "GradientBoostingClassifier(n_estimators=100)",
      "neural-network": "MLPClassifier(hidden_layer_sizes=(10,5))",
    }

    return `from sklearn.${moduleMap[algo] || "tree"} import ${classMap[algo] || "DecisionTreeClassifier"}
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Load & Split Data
data = load_iris()
X_train, X_test, y_train, y_test = train_test_split(data.data, data.target, test_size=0.2, random_state=42)

# Train Model
model = ${initMap[algo] || "DecisionTreeClassifier(max_depth=3)"}
model.fit(X_train, y_train)

# Evaluate
acc = accuracy_score(y_test, model.predict(X_test))
print(f"Model ${algo} Selesai! Accuracy: {acc:.2f}")`
  }

  const renderSimulator = () => {
    if (selectedAlgo === "linear-regression") return <LinearRegressionSimulator />
    if (selectedAlgo === "k-means") return <KMeansSimulator />
    if (selectedAlgo === "neural-network") return <NeuralNetSimulator />
    if (selectedAlgo === "decision-tree") return <DecisionTreeSimulator />
    if (selectedAlgo === "random-forest") return <RandomForestSimulator />

    // Fallback informatif untuk algoritma tanpa simulator visual
    const algoInfo = algorithms.find((a) => a.id === selectedAlgo)
    return (
      <div className="glass p-8 rounded-3xl border border-white/10 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-neura-amber/10 flex items-center justify-center mx-auto">
          <Sliders className="w-8 h-8 text-neura-amber" />
        </div>
        <h3 className="text-xl font-bold font-display text-white">
          Simulator Visual untuk {algoInfo?.name || selectedAlgo} belum tersedia
        </h3>
        <p className="text-sm text-neura-muted max-w-md mx-auto">
          Gunakan mode <strong className="text-neura-cyan">Code Runner</strong> untuk menjalankan kode Python {algoInfo?.name || selectedAlgo} secara interaktif dan melihat hasil evaluasi model.
        </p>
        <button
          onClick={() => setViewMode("code")}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-neura-cyan text-neura-deep rounded-2xl text-xs font-bold hover:bg-neura-cyan/90 transition-all shadow-lg shadow-neura-cyan/20"
        >
          <Code className="w-4 h-4" /> Beralih ke Code Runner
        </button>
      </div>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen pt-28 pb-24 px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold font-display mb-2">ML Interactive Playground</h1>
              <p className="text-neura-muted text-sm max-w-2xl">
                Eksperimen langsung dengan 8 algoritma Machine Learning: jalankan simulasi visual interaktif
                atau eksekusi kode Python real-time.
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex gap-2 p-1.5 glass rounded-2xl w-fit">
              <button
                onClick={() => setViewMode("visual")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
                  viewMode === "visual"
                    ? "bg-neura-cyan text-neura-deep shadow-lg shadow-neura-cyan/20"
                    : "text-neura-muted hover:text-white"
                )}
              >
                <Sparkles className="w-4 h-4" /> Simulasi Visual
              </button>
              <button
                onClick={() => setViewMode("code")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
                  viewMode === "code"
                    ? "bg-neura-cyan text-neura-deep shadow-lg shadow-neura-cyan/20"
                    : "text-neura-muted hover:text-white"
                )}
              >
                <Code className="w-4 h-4" /> Code Runner
              </button>
            </div>
          </motion.div>

          {/* Algorithm Selector Bar */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {algorithms.map((algo) => (
              <button
                key={algo.id}
                onClick={() => setSelectedAlgo(algo.id)}
                className={cn(
                  "px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap border shrink-0",
                  selectedAlgo === algo.id
                    ? "bg-neura-cyan/20 border-neura-cyan text-neura-cyan"
                    : "glass border-white/10 text-neura-muted hover:text-white"
                )}
              >
                {algo.name}
              </button>
            ))}
          </div>

          {/* Dynamic Mode View */}
          {viewMode === "visual" ? (
            <motion.div key={`visual-${selectedAlgo}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {renderSimulator()}
            </motion.div>
          ) : (
            <motion.div key={`code-${selectedAlgo}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <InteractiveCodeRunner key={selectedAlgo} initialCode={getCodeSnippet(selectedAlgo)} algoId={selectedAlgo} />
            </motion.div>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
