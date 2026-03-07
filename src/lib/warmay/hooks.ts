'use client'

import { useState, useCallback } from 'react'
import { warmayAPI } from './api'
import type {
  MaternalUser,
  PrenatalControl,
  TokenBalance,
  EmergencyAlert,
  TrustContact,
  ChatMessage,
  WorldIDProof,
} from './types'

// ==========================================
// World ID Hook
// ==========================================

export function useWorldID() {
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const verify = useCallback(async (proof: WorldIDProof, action: string) => {
    setIsVerifying(true)
    setError(null)

    try {
      const response = await warmayAPI.verifyWorldID({ proof, action })
      
      if (response.success) {
        setIsVerified(true)
        return response.data
      } else {
        setError(response.error?.message || 'Verification failed')
        return null
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return null
    } finally {
      setIsVerifying(false)
    }
  }, [])

  return { verify, isVerifying, isVerified, error }
}

// ==========================================
// User Hook
// ==========================================

export function useUser() {
  const [user, setUser] = useState<MaternalUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUser = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await warmayAPI.getCurrentUser()
      
      if (response.success && response.data) {
        setUser(response.data)
      } else {
        setError(response.error?.message || 'Failed to fetch user')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateLocation = useCallback(async (lat: number, lng: number) => {
    try {
      await warmayAPI.updateLocation(lat, lng)
    } catch (err) {
      console.error('Failed to update location:', err)
    }
  }, [])

  return { user, fetchUser, updateLocation, isLoading, error }
}

// ==========================================
// Prenatal Controls Hook
// ==========================================

export function useControls() {
  const [controls, setControls] = useState<PrenatalControl[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchControls = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await warmayAPI.getControls()
      
      if (response.success && response.data) {
        setControls(response.data)
      } else {
        setError(response.error?.message || 'Failed to fetch controls')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const verifyOnChain = useCallback(async (controlId: string) => {
    setIsVerifying(true)

    try {
      const response = await warmayAPI.verifyControlOnChain(controlId)
      
      if (response.success) {
        // Refresh controls after verification
        await fetchControls()
        return response.data
      } else {
        setError(response.error?.message || 'Verification failed')
        return null
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return null
    } finally {
      setIsVerifying(false)
    }
  }, [fetchControls])

  return { controls, fetchControls, verifyOnChain, isLoading, isVerifying, error }
}

// ==========================================
// Tokens Hook
// ==========================================

export function useTokens() {
  const [balance, setBalance] = useState<TokenBalance | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBalance = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await warmayAPI.getTokenBalance()
      
      if (response.success && response.data) {
        setBalance(response.data)
      } else {
        setError(response.error?.message || 'Failed to fetch balance')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const claimTokens = useCallback(async () => {
    setIsClaiming(true)
    setError(null)

    try {
      const response = await warmayAPI.claimTokens()
      
      if (response.success) {
        // Refresh balance after claim
        await fetchBalance()
        return response.data
      } else {
        setError(response.error?.message || 'Claim failed')
        return null
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return null
    } finally {
      setIsClaiming(false)
    }
  }, [fetchBalance])

  return { balance, fetchBalance, claimTokens, isLoading, isClaiming, error }
}

// ==========================================
// Emergency Hook
// ==========================================

export function useEmergency() {
  const [activeAlert, setActiveAlert] = useState<EmergencyAlert | null>(null)
  const [isTriggering, setIsTriggering] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const triggerSOS = useCallback(async () => {
    setIsTriggering(true)
    setError(null)

    try {
      // Get current location
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
        })
      })

      const response = await warmayAPI.triggerEmergency('SOS', {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
      
      if (response.success && response.data) {
        setActiveAlert(response.data)
        return response.data
      } else {
        setError(response.error?.message || 'Failed to trigger emergency')
        return null
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return null
    } finally {
      setIsTriggering(false)
    }
  }, [])

  const cancelAlert = useCallback(async () => {
    if (!activeAlert) return

    try {
      await warmayAPI.cancelEmergency(activeAlert.id)
      setActiveAlert(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }, [activeAlert])

  return { activeAlert, triggerSOS, cancelAlert, isTriggering, error }
}

// ==========================================
// Trust Network Hook
// ==========================================

export function useTrustNetwork() {
  const [contacts, setContacts] = useState<TrustContact[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchContacts = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await warmayAPI.getTrustContacts()
      
      if (response.success && response.data) {
        setContacts(response.data)
      } else {
        setError(response.error?.message || 'Failed to fetch contacts')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const addContact = useCallback(async (contact: Omit<TrustContact, 'id' | 'maternal_id' | 'is_verified'>) => {
    try {
      const response = await warmayAPI.addTrustContact(contact)
      
      if (response.success) {
        await fetchContacts()
        return response.data
      } else {
        setError(response.error?.message || 'Failed to add contact')
        return null
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return null
    }
  }, [fetchContacts])

  const removeContact = useCallback(async (id: string) => {
    try {
      await warmayAPI.removeTrustContact(id)
      await fetchContacts()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }, [fetchContacts])

  return { contacts, fetchContacts, addContact, removeContact, isLoading, error }
}

// ==========================================
// AI Chat Hook
// ==========================================

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(async (
    content: string,
    language: 'es' | 'qu' | 'ay' = 'es',
    context?: { weeks_pregnant: number; risk_level: string }
  ) => {
    setIsSending(true)
    setError(null)

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content,
      language,
      created_at: new Date().toISOString(),
    }
    setMessages(prev => [...prev, userMessage])

    try {
      const response = await warmayAPI.sendChatMessage({
        maternal_id: '', // Will be filled by backend from auth
        message: content,
        language,
        context,
      })
      
      if (response.success && response.data) {
        const aiMessage: ChatMessage = {
          id: `ai-${Date.now()}`,
          type: 'ai',
          content: response.data.message,
          language: response.data.language,
          metadata: {
            risk_detected: response.data.risk_detected,
            escalate_to_professional: response.data.escalate,
          },
          created_at: new Date().toISOString(),
        }
        setMessages(prev => [...prev, aiMessage])
        return response.data
      } else {
        setError(response.error?.message || 'Failed to send message')
        return null
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return null
    } finally {
      setIsSending(false)
    }
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  return { messages, sendMessage, clearMessages, isSending, error }
}
