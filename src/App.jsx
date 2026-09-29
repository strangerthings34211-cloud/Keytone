import { Suspense, lazy, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from '@/components/layout/Layout'
import KeytonePreloader from '@/components/ui/KeytonePreloader'

// ── Eager-loaded pages (above-the-fold critical paths) ─────────
import HomePage from '@/pages/HomePage'

// ── Lazily loaded pages (code-split per route) ─────────────────
const AboutPage           = lazy(() => import('@/pages/AboutPage'))
const RDPage              = lazy(() => import('@/pages/RDPage'))
const QualityControlPage  = lazy(() => import('@/pages/QualityControlPage'))
const CertificationsPage  = lazy(() => import('@/pages/CertificationsPage'))
const ExportsPage         = lazy(() => import('@/pages/ExportsPage'))
const ProductsPage        = lazy(() => import('@/pages/ProductsPage'))
const CategoryPage        = lazy(() => import('@/pages/CategoryPage'))
const ProductDetailPage   = lazy(() => import('@/pages/ProductDetailPage'))
const BlogPage            = lazy(() => import('@/pages/BlogPage'))
const BlogDetailPage      = lazy(() => import('@/pages/BlogDetailPage'))
const CareersPage         = lazy(() => import('@/pages/CareersPage'))
const ContactPage         = lazy(() => import('@/pages/ContactPage'))
const PrivacyPolicyPage   = lazy(() => import('@/pages/PrivacyPolicyPage'))
const NotFoundPage        = lazy(() => import('@/pages/NotFoundPage'))

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<KeytonePreloader isSuspense={true} fullScreen={true} />}>
          <Routes>
            {/* ── Pages WITH shared Layout (Navbar + Footer) ── */}
            <Route
              element={
                <Layout>
                  {/* Outlet rendered by nested routes */}
                </Layout>
              }
            >
              {/*
               * Note: React Router v6 requires <Outlet /> inside the Layout
               * when using nested routes. Since Layout wraps {children} directly
               * (not <Outlet />), we use a flat route structure with Layout
               * wrapping each page individually below.
               */}
            </Route>

            {/* ── Flat routes with inline layout wrapper ── */}
            <Route path="/" element={
              <Layout><HomePage /></Layout>
            } />

            <Route path="/about-us" element={
              <Layout><AboutPage /></Layout>
            } />

            {/* Research & Quality routes */}
            <Route path="/research-development" element={
              <Layout><RDPage /></Layout>
            } />
            {/* Redirect legacy /r-and-d/ URL */}
            <Route path="/r-and-d" element={
              <Layout><RDPage /></Layout>
            } />

            <Route path="/quality-control" element={
              <Layout><QualityControlPage /></Layout>
            } />

            <Route path="/certifications" element={
              <Layout><CertificationsPage /></Layout>
            } />

            <Route path="/exports" element={
              <Layout><ExportsPage /></Layout>
            } />

            {/* Products routes */}
            <Route path="/products" element={
              <Layout><ProductsPage /></Layout>
            } />
            <Route path="/products/:categorySlug" element={
              <Layout><CategoryPage /></Layout>
            } />
            <Route path="/products/:categorySlug/:productSlug" element={
              <Layout><ProductDetailPage /></Layout>
            } />

            {/* Blog routes */}
            <Route path="/blog" element={
              <Layout><BlogPage /></Layout>
            } />
            <Route path="/blog/:slug" element={
              <Layout><BlogDetailPage /></Layout>
            } />

            {/* Other pages */}
            <Route path="/careers" element={
              <Layout><CareersPage /></Layout>
            } />
            <Route path="/contact-us" element={
              <Layout><ContactPage /></Layout>
            } />
            <Route path="/privacy-policy" element={
              <Layout><PrivacyPolicyPage /></Layout>
            } />

            {/* 404 — must be last */}
            <Route path="*" element={
              <Layout><NotFoundPage /></Layout>
            } />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  )
}
