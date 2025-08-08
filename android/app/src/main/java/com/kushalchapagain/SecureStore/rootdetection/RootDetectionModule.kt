package com.kushalchapagain.securestore.rootdetection

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.Arguments
import android.provider.Settings
import android.content.Context
import com.scottyab.rootbeer.RootBeer

class RootDetectionModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    
    private val rootBeer = RootBeer(reactContext);

    override fun getName(): String {
        return "RootDetection"
    }
    
    @ReactMethod
    fun checkRootStatus(promise: Promise) {
        try {
          // I use the rootBeer for android to check weather the app is rooted or not
            val isRooted =rootBeer.isRooted() 
            // val subBinaary=rootBeer.checkForSuBinary() 
            val result = Arguments.createMap()
            result.putBoolean("isRooted", isRooted)
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("ROOT_CHECK_ERROR", e.message, e)
        }
    }
    
    @ReactMethod
    fun checkDeveloperOptions(promise: Promise) {
        try {
            val isDeveloperEnabled = isDeveloperOptionsEnabled()
            
            val result = Arguments.createMap()
            result.putBoolean("isDeveloperOptionsEnabled", isDeveloperEnabled)
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("DEVELOPER_CHECK_ERROR", e.message, e)
        }
    }
    
    
    private fun isDeveloperOptionsEnabled(): Boolean {
        return try {
            Settings.Global.getInt(
                reactApplicationContext.contentResolver,
                Settings.Global.DEVELOPMENT_SETTINGS_ENABLED,
                0
            ) == 1
        } catch (e: Exception) {
            false
        }
    }
    
}
